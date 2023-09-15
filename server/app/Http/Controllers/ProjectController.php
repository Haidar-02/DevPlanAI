<?php

namespace App\Http\Controllers;

use App\Models\ContributionRequest;
use App\Models\Notification;
use App\Models\Project;
use App\Models\User;
use Error;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    public function getMyProjects(Request $request)
    {
        $user = User::findOrFail(Auth::id());
    
        $projects = $user->projects()->with('projectManager')->with('team');
    
        $contributedProjects = Project::whereHas('team', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('projectManager')->with('team');
    
        $projects = $projects->union($contributedProjects)->get();
    
        $projects->map(function ($project) {
            $project->status = $project->status;
            return $project;
        });
    
        return response()->json([
            'projects' => $projects,
        ]);
    }


    public function getMyRecentProjects(Request $request)
    {
        $user = User::where('id', Auth::id())->first();
        $projects = $user->projects()
        ->with('projectManager')
        ->with('team')
        ->orderBy('created_at', 'desc')
        ->take(5)
        ->get();

        $projects->map(function ($project) {
            $project->status = $project->status;
            return $project;
        });
        
        return response()->json([
            'projects' => $projects,
        ]);
    }

    public function getProjectInfo($projectId)
    {
        $project = Project::findOrFail($projectId);
    
        $doneTasksCount = $project->tasks()->where('is_done', true)->count();
        $pendingTasksCount = $project->tasks()->where('is_done', false)->count();
    
        $status = $project->status;
        $team = $project->team;
        $project_manager=$project->projectManager;
    
        return response()->json([
            'project' => $project,
            'done_tasks_count' => $doneTasksCount,
            'pending_tasks_count' => $pendingTasksCount,
            'status' => $status,
        ]);
    }

    public function getProjectTasks($projectId)
    {
        $project = Project::findOrFail($projectId);
    
        $tasks = $project->tasks()
            ->with('assignee')
            ->get();
    
        $tasks->map(function ($task) {
            $task->status = $task->status;
            return $task;
        });
    
        return response()->json([
            'tasks' => $tasks,
        ]);
    }
    

    public function getProjectTeam($projectId)
    {
        $project = Project::findOrFail($projectId);
        $teamMembers = $project->team;

        return response()->json([
            'team' => $teamMembers,
        ]);
    }

    public function markProjectDone(Request $request, $projectId)
    {
        try{
            $project = Project::findOrFail($projectId);
            $user = Auth::user();

            if ($user->id !== $project->project_manager_id) {
                return response()->json([
                    'status' => "failed",
                    'message' => 'Only the project manager can mark the project as done.',
                ], 403);
            }

            $project->is_done = true;
            $project->finish_date = now();
            $project->save();

            $teamMembers = $project->team;

            $notification='Project ' . $project->title . ' is marked as done';

            foreach ($teamMembers as $teamMember) {
                Notification::create([
                    'user_id' => $teamMember->id,
                    'message' => $notification,
                    'is_read' => false,
                ]);
            }

            return response()->json([
                'status' => "success",
                'message' => 'Project marked as done!',
                'project' =>$project,
            ]);
        }catch(Error $e){
            return response()->json([
                'status' => 'failed',
                'message' => 'An error occured try again later',
            ]);
        }
    }

    public function editProjectInfo(Request $request, $projectId)
    {
        try{
            $project = Project::findOrFail($projectId);
            $user = Auth::user();

            if ($user->id !== $project->project_manager_id) {
                return response()->json([
                    'message' => 'Only the project manager can edit project information.',
                ], 403);
            }

            if(!$request->title || !$request->description ||!$request->deadline){
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Please fill in all fields',
                ]);
            }

            if($request->title ==$project->title 
            && $request->description == $project->description 
            && $request->deadline == $project->deadline){
                return response()->json([
                    'status' => 'failed',
                    'message' => 'No Change Occured',
                ]);
            }

            $project->title = $request->title;
            $project->description = $request->description;
            $project->deadline = $request->deadline;
            $project->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Project information updated successfully.',
                'project' => $project,
            ]);

        }catch(Error $e){
            return response()->json([
                'status' => 'failed',
                'message' => 'An error occured try again later',
            ]);
        }
    }

    public function deleteProject($projectId)
    {
        $project = Project::findOrFail($projectId);
        $user = Auth::user();

        if ($user->id !== $project->project_manager_id) {
            return response()->json([
                'message' => 'Only the project manager can delete the project.',
            ], 403);
        }

        //TODO Delete the project and related data

        return response()->json([
            'message' => 'Project deleted successfully.',
        ]);
    }

    public function addProjectContributor(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $user = Auth::user();

        if ($user->id !== $project->project_manager_id) {
            return response()->json([
                'message' => 'Only the project manager can add contributors.',
            ], 403);
        }

        //TODO Add a contributor

        return response()->json([
            'message' => 'Contributor added to the project successfully.',
        ]);
    }

    public function removeProjectContributer(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $user = Auth::user();

        if ($user->id !== $project->project_manager_id) {
            return response()->json([
                'message' => 'Only the project manager can remove contributors.',
            ], 403);
        }

        //TODO Remove a contributor from the project

        return response()->json([
            'message' => 'Contributor removed from the project successfully.',
        ]);
    }

    public function acceptContribution(Request $request, $contributionRequestId)
    {
        $contributionRequest = ContributionRequest::findOrFail($contributionRequestId);
        //TODO Accept the contribution request

        return response()->json([
            'message' => 'Contribution request accepted successfully.',
        ]);
    }

    public function declineContribution(Request $request, $contributionRequestId)
    {
        $contributionRequest = ContributionRequest::findOrFail($contributionRequestId);
        // TODO Decline the contribution request

        return response()->json([
            'message' => 'Contribution request declined successfully.',
        ]);
    }

    //using openai api
    // function generateProject(Request $request){}
    
}
