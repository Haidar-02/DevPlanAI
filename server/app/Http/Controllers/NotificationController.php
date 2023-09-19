<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getUnreadNotifications(Request $request)
    {
        try {
            $user = auth()->user();
    
            $notifications = Notification::where('user_id', $user->id)
                ->where('is_read', false)
                ->orderBy('created_at', 'desc')
                ->get();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Unread notifications retrieved successfully',
                'notifications' => $notifications,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while retrieving notifications.',
            ]);
        }
    }

    public function getReadNotifications(Request $request)
    {
        try {
            $user = auth()->user();
    
            $notifications = Notification::where('user_id', $user->id)
                ->where('is_read', true)
                ->orderBy('created_at', 'desc')
                ->get();
    
            return response()->json([
                'status' => 'success',
                'message' => 'Read notifications retrieved successfully',
                'notifications' => $notifications,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while retrieving notifications.',
            ]);
        }
    }
    
    public function markNotificationAsRead(Request $request, $notification_id)
    {
        try {
    
            $notification = Notification::findOrFail($notification_id);
    
            $notification->update(['is_read' => true]);
    
            return response()->json([
                'status' => 'success',
                'message' => 'Notification marked as read successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while marking the notification as read.',
            ]);
        }
    }
}
