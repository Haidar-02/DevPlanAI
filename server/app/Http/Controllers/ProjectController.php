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
        $user = User::findOrFail(Auth::id());

        $projects = $user->projects()
            ->with('projectManager')
            ->with('team');

        $contributedProjects = Project::whereHas('team', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with('projectManager')->with('team');

        $mergedProjects = $projects->union($contributedProjects)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $mergedProjects->map(function ($project) {
            $project->status = $project->status;
            return $project;
        });

        return response()->json([
            'projects' => $mergedProjects,
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
                    'status' => "error",
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
                'status' => 'error',
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
                    'status' => 'error',
                    'message' => 'Only the project manager can edit project information.',
                ], 403);
            }

            if(!$request->title || !$request->description ||!$request->deadline){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Please fill in all fields',
                ]);
            }

            if($request->title ==$project->title 
            && $request->description == $project->description 
            && $request->deadline == $project->deadline){
                return response()->json([
                    'status' => 'error',
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
                'status' => 'error',
                'message' => 'An error occured try again later',
            ]);
        }
    }

    public function deleteProject($projectId)
    {
        try {
            $project = Project::findOrFail($projectId);
            $user = Auth::user();
    
            if ($user->id !== $project->project_manager_id) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Only the project manager can delete the project.',
                ], 403);
            }
    
            Comments::where('task_id', $project->tasks->pluck('id'))->delete();
    
            Task::where('project_id', $projectId)->delete();
    
            $teamMembers = $project->team;

            $notification='Project ' . $project->title . ' has been abandoned';

            foreach ($teamMembers as $teamMember) {
                Notification::create([
                    'user_id' => $teamMember->id,
                    'message' => $notification,
                    'is_read' => false,
                ]);
            }
    
            Team::where('project_id', $projectId)->delete();
    
            $project->delete();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Project deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Project could not be deleted. Try again later.',
            ]);
        }
    }
    

    public function addProjectContributor(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $user = Auth::user();

        if ($user->id !== $project->project_manager_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Only the project manager can add contributors.',
            ], 403);
        }

        $existing =Team::where('project_id', $project->id)->where('user_id', $request->user_id)->first();

        if($existing){
            return response()->json([
                'status' => 'error',
                'message' => 'Contributor already exists in project '. $project->title,
            ]);
        }

        $exisingRequest = ContributionRequest::where('user_id', $request->user_id)->where('project_id', $projectId);
        if($exisingRequest){
            return response()->json([
                'status' => 'error',
                'message' => 'Request already sent',
            ]);
        }

        $contribRequest = ContributionRequest::create([
            'user_id'=>$request->user_id,
            'project_id'=>$projectId,
        ]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Contribution request sent successfully.',
            'Request'=>$contribRequest
        ]);
    }

    public function removeProjectContributer(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
        $user = Auth::user();

        if ($user->id !== $project->project_manager_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Only the project manager can remove contributors.',
            ], 403);
        }
        if(!$request->user_id){
            return response()->json([
                'status' => 'error',
                'message' => 'No contributor selected',
            ]);
        }

        $checkExistance = Team::where('user_id', $request->user_id)->where('project_id', $projectId);
        if($checkExistance){
            return response()->json([
                'status' => 'error',
                'message' => 'Member not in your team',
            ]);
        }

        $assigned_tasks=Task::where('project_id', $projectId)->where('assignee_id', $request->user_id);

        foreach($assigned_tasks as $task){
            $task->assignee_id=null;
        }

        Team::where('project_id', $projectId)->where('user_id', $request->user_id)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Contributor removed from the project successfully.',
        ]);
    }

    public function acceptContribution(Request $request, $contributionRequestId)
    {
        $contributionRequest = ContributionRequest::findOrFail($contributionRequestId);

        if(!$contributionRequest){
            return response()->json([
                'status' => 'error',
                "message" => "Request don't exist.",
            ]);
        }

        $existing=Team::where('user_id',$contributionRequest->user_id)
        ->where('project_id', $contributionRequest->project_id)->first();
        if($existing){
            $contributionRequest->delete();
            return response()->json([
                'status' => 'error',
                'message' => 'Already contributing in this project.',
            ]);
        }

        $project = Project::where('project_id', $contributionRequest->project_id)->first();
        $user=User::where('user_id', $contributionRequest->user_id);

        $newMember= Team::create([
            'user_id'=>$contributionRequest->user_id,
            'project_id'=>$contributionRequest->project_id,
        ]);

        $notification='Member ' . $user->first_name . ' '.$user->last_name.' has accepted your team request on '. $project->title ;
        Notification::create([
            'user_id' => $project->project_manager_id,
            'message' => $notification,
            'is_read' => false,
        ]);

        $contributionRequest->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Contribution request accepted successfully.',
            'newMember'=>$newMember,
        ]);
    }

    public function declineContribution(Request $request, $contributionRequestId)
    {
        $contributionRequest = ContributionRequest::findOrFail($contributionRequestId);
        
        if(!$contributionRequest){
            return response()->json([
                'status' => 'error',
                "message" => "Request don't exist.",
            ]);
        }
        $contributionRequest->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Contribution request declined successfully.',
        ]);
    }

    public function searchMyProjects(Request $request)
    {
        $userId = Auth::id();
    
        $searchQuery = $request->content;
    
        $projects = Project::where(function ($query) use ($searchQuery) {
            $query->where('title', 'like', '%' . $searchQuery . '%')
                  ->orWhere('description', 'like', '%' . $searchQuery . '%');
        })
        ->where(function ($query) use ($userId) {
            $query->whereHas('team', function ($subquery) use ($userId) {
                $subquery->where('user_id', $userId);
            })
            ->orWhere('project_manager_id', $userId);
        })
        ->with('projectManager')
        ->with('team')
        ->get();
    
        $projects->map(function ($project) {
            $project->status = $project->status;
            return $project;
        });
    
        return response()->json([
            'projects' => $projects,
        ]);
    }

    //using openai api
    // function generateProject(Request $request){}
    
}
