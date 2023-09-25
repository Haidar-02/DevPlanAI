<?php

namespace App\Http\Controllers;

use App\Models\ContributionRequest;
use App\Models\Notification;
use App\Models\Project;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Error;
use Illuminate\Contracts\Validation\Rule;
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

    public function updateProfile(Request $request)
    {
        try{
            $user =User::where('id', Auth::id())->first();
        
            if(!$request->email || !$request->first_name || !$request->last_name){
                return response()->json([
                    "status"=>"error",
                    'message' => 'Please fill in all required fields',
                ]);
            }
        
            $existingUser = User::where('email',$request->email)->first();
            if($existingUser && $request->email != $user->email){
                return response()->json([
                    "status"=>"error",
                    'message' => 'Email already in use',
                ]);
            }
        
            if($request->email == $user->email 
            && $request->first_name==$user->first_name 
            && $request->last_name==$user->last_name ){
                return response()->json([
                    "status"=>"neutral",
                    'message' => 'No change to profile',
                ]);
            }

            $user->first_name = $request->first_name;
            $user->email = $request->email;
            $user->last_name = $request->last_name;

            $user->save();
            
            return response()->json([
                'message' => 'Profile updated successfully',
                'user' => $user,
            ]);

        }catch(Error $error){
            return response()->json([
                "status"=>"error",
                'message' => 'Error updating profile. Try again later',
            ]);
        }
    }

    function getUserGeneralInfo() {
        try{
            $user = Auth::user();
    
            $unreadNotificationsCount = Notification::where('user_id', $user->id)
                ->where('is_read', false)
                ->count();
    
            $contributionRequestsCount = ContributionRequest::where('user_id', $user->id)->count();
    
            return response()->json([
                "status"=>"success",
                "user"=>$user,
                'notifications'=>$unreadNotificationsCount,
                'contribution_requests'=>$contributionRequestsCount
            ]);
        }catch(Error $E){
            return response()->json([
                "status"=>"error",
                'message' => 'Error getting user info. Try again later',
            ]);
        }
           
    }
}
