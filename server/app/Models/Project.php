<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'deadline',
        'is_done',
        'finish_date',
        'project_manager_id',
    ];

    public function projectManager()
    {
        return $this->belongsTo(User::class, 'project_manager_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function teams()
    {
        return $this->hasMany(Team::class);
    }

    public function contributionRequests()
    {
        return $this->hasMany(ContributionRequest::class);
    }
}
