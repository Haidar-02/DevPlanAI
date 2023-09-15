<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    //only Project manager
    function addProjectTask(Request $request){}
    
    //only Project manager
    function deleteProjectTask(Request $request){}

    //only Project manager, require notifying asignee
    function editProjectTask(Request $request){}

    function markTaskDone(Request $request){}

    //only Project manager
    function addTaskAssignee(Request $request){}

    //only Project manager
    function removeTaskAssignee(Request $request){}

    function addTaskComment(Request $request){}

    function getTaskInfo(Request $request){}

    function getTaskComments(Request $request){}
}
