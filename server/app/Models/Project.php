<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table = 'projects';

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

    public function team()
    {
        return $this->hasManyThrough(User::class, Team::class, 'project_id', 'id', 'id', 'user_id');
    }

    public function contributionRequests()
    {
        return $this->hasMany(ContributionRequest::class);
    }

    public function getStatusAttribute()
    {
        if ($this->is_done) {
            return 'Done';
        } elseif (now() < $this->deadline) {
            return 'Pending';
        } else {
            return 'Late';
        }
    }
}
