<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function addNewTask(Request $request, $project_id)
    {
        try {
            $user = Auth::user();
            $project = Project::findOrFail($project_id);
            
            if ($user->id !== $project->project_manager_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only the project manager can add a new task.',
                ], 403);
            }
    
            if(!$request->title||!$request->description||!$request->deadline){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Please fill in all fields !',
                ]);
            }
    
            $task = Task::create([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'deadline' => $request->input('deadline'),
                'project_id' => $project_id,
            ]);
    
            return response()->json([
                'status' => 'success',
                'message' => 'Task added successfully.',
                'task' => $task,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while adding the task.',
            ]);
        }
    }
    
    public function deleteTask(Request $request, $task_id)
    {
        try {
            $task = Task::findOrFail($task_id);
    
            $user = Auth::user();
            $project = $task->project;
            
            if ($user->id !== $project->project_manager_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only the project manager can delete a task.',
                ], 403);
            }
    
            $task->delete();
        
            return response()->json([
                'status' => 'success',
                'message' => 'Task deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the task.',
            ]);
        }
    }
    
    public function editTask(Request $request, $task_id)
    {
        try {
            $task = Task::findOrFail($task_id);
    
            $user = Auth::user();
            $project = $task->project;
            
            if ($user->id !== $project->project_manager_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only the project manager can edit a task.',
                ], 403);
            }
    
            if (!$request->filled('title') || !$request->filled('description') || !$request->filled('deadline')) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Please fill in all fields!',
                ]);
            }

            if($task->title==$request->title
            && $task->description==$request->description
            && $task->deadline==$request->deadline){
                return response()->json([
                    'status' => 'error',
                    'message' => 'No change occured to task',
                ]);
            }
    
            $task->update([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'deadline' => $request->input('deadline'),
            ]);
    
            return response()->json([
                'status' => 'success',
                'message' => 'Task updated successfully.',
                'task' => $task,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while updating the task.',
            ]);
        }
    }
    
    public function markTaskDone(Request $request, $task_id)
    {
        try {
            $task = Task::findOrFail($task_id);
    
            $task->is_done = true;
            $task->save();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Task marked as done successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while marking the task as done.',
            ]);
        }
    }

    public function markTaskUndone(Request $request, $task_id)
    {
        try {
            $task = Task::findOrFail($task_id);
    
            $task->is_done = false;
            $task->save();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Task marked as unDone successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while marking the task as done.',
            ]);
        }
    }
    
    public function addTaskAssignee(Request $request, $task_id)
    {
        try {
            $task = Task::findOrFail($task_id);
            $user = Auth::user();
            $project = $task->project;
            
            if ($user->id !== $project->project_manager_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only the project manager can add a task assignee.',
                ], 403);
            }
    
            if(!$request->assignee_id){
                return response()->json([
                    'status' => 'error',
                    'message' => 'No assignee selected',
                ]);
            }
    
            $task->update([
                'assignee_id' => $request->input('assignee_id'),
            ]);
    
            return response()->json([
                'status' => 'success',
                'message' => 'Task assignee added successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while adding the task assignee.',
            ]);
        }
    }
    
    public function removeTaskAssignee(Request $request, $task_id)
    {
        try {
            $task = Task::findOrFail($task_id);
    
            $user = Auth::user();
            $project = $task->project;
            
            if ($user->id !== $project->project_manager_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only the project manager can remove a task assignee.',
                ], 403);
            }
    
            if(!$request->assignee_id){
                return response()->json([
                    'status' => 'error',
                    'message' => 'No assignee selected',
                ]);
            }
    
            $task->update([
                'assignee_id' => null,
            ]);
    
            return response()->json([
                'status' => 'success',
                'message' => 'Task assignee removed successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while removing the task assignee.',
            ]);
        }
    }
    
    public function addTaskComment(Request $request, $task_id)
    {
        try {
            // Find the task
            $task = Task::findOrFail($task_id);
    
            // Validate the request data
            $request->validate([
                'comment' => 'required|string',
            ]);
    
            // Create a new comment for the task
            $comment = Comments::create([
                'comment' => $request->input('comment'),
                'task_id' => $task_id,
                'user_id' => Auth::id(),
            ]);
    
            return response()->json([
                'status' => 'success',
                'message' => 'Task comment added successfully.',
                'comment' => $comment,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while adding the task comment.',
            ]);
        }
    }
    
    public function getTaskInfo(Request $request, $task_id)
    {
        try {
            // Find the task with related assignees
            $task = Task::with('assignees')->findOrFail($task_id);
    
            return response()->json([
                'status' => 'success',
                'task' => $task,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while retrieving task information.',
            ]);
        }
    }
    
    public function getTaskComments(Request $request, $task_id)
    {
        try {
            // Find the task with related comments and user info
            $task = Task::with('comments.user')->findOrFail($task_id);
    
            return response()->json([
                'status' => 'success',
                'task' => $task,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while retrieving task comments.',
            ]);
        }
    }
}
