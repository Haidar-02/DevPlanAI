<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // User Types table
        Schema::create('user_types', function (Blueprint $table) {
            $table->id();
            $table->string('user_type');
            $table->timestamps();
        });
        // Users table
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password');
            $table->unsignedBigInteger('user_type_id');
            $table->foreign('user_type_id')->references('id')->on('user_types');
            $table->longText('profile_picture')->nullable();
            $table->timestamps();
        });

        

        // Projects table
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->date('deadline');
            $table->boolean('is_done')->default(false);
            $table->date('finish_date')->nullable();
            $table->unsignedBigInteger('project_manager_id');
            $table->foreign('project_manager_id')->references('id')->on('users');
            $table->timestamps();
        });

        // Tasks table
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->date('deadline');
            $table->boolean('is_done')->default(false);
            $table->unsignedBigInteger('assignee_id')->nullable();
            $table->foreign('assignee_id')->references('id')->on('users');
            $table->unsignedBigInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects');
            $table->timestamps();
        });

        // Comments table
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('task_id');
            $table->foreign('task_id')->references('id')->on('tasks');
            $table->timestamps();
        });

        // Teams table
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects');
            $table->timestamps();
        });

        // Contribution Requests table
        Schema::create('contribution_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedBigInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects');
            $table->timestamps();
        });

        // Notifications table
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('contribution_requests');
        Schema::dropIfExists('teams');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('tasks');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('user_types');
        Schema::dropIfExists('users');
    }
};
