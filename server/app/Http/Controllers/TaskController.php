<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use App\Models\Notification;
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
    
    public function markTaskDone($task_id)
    {
        try {
            $task = Task::findOrFail($task_id);
    
            $task->is_done = !$task->is_done;
            $task->save();
    
            $message = $task->is_done ? 'Task marked as done successfully.' : 'Task marked as undone successfully.';
    
            return response()->json([
                'status' => 'success',
                'message' => $message,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while marking the task as done/undone.',
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
            $task = Task::findOrFail($task_id);
            $project = Project::findOrFail($task->project_id);
    
            if(!$request->comment){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Cannot send empty comment',
                ]);
            }
    
            $comment = Comments::create([
                'content' => $request->input('comment'),
                'task_id' => $task_id,
                'user_id' => Auth::id(),
            ]);
            
            if($task->assignee_id && Auth::id()!=$task->assignee_id){
                Notification::create([
                    'user_id' => $task->assignee_id,
                    'is_read' => false,
                    'message' => "New Comment from " . Auth::user()->first_name ." on task ". $task->title . " in project ".$project->title
                ]);
            }

            return response()->json([
                'status' => 'success',
                'message' => 'Task comment added successfully.',
                'comment' => $comment,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while adding the task comment.',
                'error'=>$e
            ]);
        }
    }
    
    public function getTaskInfo($task_id)
    {
        try {
            $task = Task::with('assignee')->findOrFail($task_id);
            $status=$task->status;
    
            return response()->json([
                'status' => 'success',
                'task' => $task,
                'task_status'=>$status,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while retrieving task information.',
            ]);
        }
    }
    
    public function getTaskComments($task_id)
    {
        try {
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

    public function getUpcomingTasks() {
        $tasks = Task::where('assignee_id', Auth::id())
                     ->where('is_done', false)
                     ->orderBy('created_at', 'desc') 
                     ->take(4)
                     ->get();
    
    
        foreach ($tasks as $task) {
            $task->status = $task->status;
        }
    
        return response()->json(['status' => 'success', 'message' => 'Upcoming tasks retrieved successfully.', 'tasks' => $tasks]);
    }

    public function getRecentComments(Request $request)
    {
        try {
            $comments = Comments::whereHas('task', function ($query) {
                    $query->where('assignee_id', Auth::id());
                })
                ->with(['task.project', 'user'])
                ->latest()
                ->limit(2)
                ->get();
    
            return response()->json([
                'status' => 'success',
                'comments' => $comments,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while retrieving recent comments.',
            ]);
        }
    }   
    
}
