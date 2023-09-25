<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use App\Models\ContributionRequest;
use App\Models\Notification;
use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Egulias\EmailValidator\Parser\Comment;
use Error;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getAllProjects()
    {
        $projects = Project::all();

        return response()->json([
            'status' => 'success',
            'projects' => $projects,
        ]);
    }

    public function searchAllProject(Request $request)
    {
        $search = $request->input('content');
        $projects = Project::where('title', 'like', "%$search%")
            ->orWhere('description', 'like', "%$search%")
            ->with('projectManager')
            ->get();

        return response()->json([
            'status' => 'success',
            'projects' => $projects,
        ]);
    }

    public function deleteProject($projectId)
    {
        try {
            $project = Project::findOrFail($projectId);
            $tasks = Task::where('project_id', $project->id)->get();
            
            foreach ($tasks as $task) {
                Comments::where('task_id', $task->id)->delete();
            }
            Team::where('project_id', $project->id)->delete();

            $tasks->each->delete();
    
            
            ContributionRequest::where('project_id', $project->id)->delete();
    
            $project->delete();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Project deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the project.',
                'error' => $e,
            ]);
        }
    }
    

    public function getAllUsers()
    {
        $users = User::all();

        return response()->json([
            'status' => 'success',
            'users' => $users,
        ]);
    }

    public function deleteUser($userId)
    {
        try {
            $user = User::findOrFail($userId);
    
            Notification::where('user_id', $user->id)->delete();
            Task::where('assignee_id', $user->id)->delete();
            Team::where('user_id', $user->id)->delete();
            Comments::where('user_id', $user->id)->delete();
            ContributionRequest::where('user_id', $user->id)->delete();
            $projects = Project::where('project_manager_id', $user->id)->get();
            foreach ($projects as $project) {
                Task::where('project_id', $project->id)->delete();
                Team::where('project_id', $project->id)->delete();
                ContributionRequest::where('project_id', $project->id)->delete();
                $project->delete();
            }
    
            $user->delete();
    
            return response()->json([
                'status' => 'success',
                'message' => 'User deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the user.',
                'error' => $e,
            ]);
        }
    }
    

    public function makeDemoteAdmin($user_id)
    {
        try {
            $user = User::findOrFail($user_id);
    
            if ($user->user_type_id == 1) {
                $user->user_type_id = 2;
                $message = 'User demoted to regular user';
            } else {
                $user->user_type_id = 1;
                $message = 'User promoted to admin';
            }
    
            $user->save();
    
            return response()->json([
                'status' => 'success',
                'message' => $message,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while updating the user role.',
            ]);
        }
    }
}
