<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function profile(){
        $user = Auth::user();
        $projects_count=Project::where('project_manager_id', Auth::id())->count();
        $contributions_count=Team::where('user_id', Auth::id())->count();
        $done_tasks = Task::where('assignee_id',Auth::id())->where('is_done', 1)->count();
        $assigned_tasks = Task::where('assignee_id',Auth::id())->where('is_done', 0)->count();
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'projects_count'=>$projects_count,
            'contributions_count'=>$contributions_count,
            'done_tasks_count'=>$done_tasks,
            'assigned_tasks_count'=>$assigned_tasks,
        ]);
    }
}
