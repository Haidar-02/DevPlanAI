<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
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
            $project->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Project deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the project.',
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
            $user->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'User deleted successfully.',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while deleting the user.',
            ]);
        }
    }
}
