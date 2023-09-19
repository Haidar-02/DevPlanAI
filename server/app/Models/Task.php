<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $table = 'tasks';

    protected $fillable = [
        'title',
        'description',
        'deadline',
        'is_done',
        'assignee_id',
        'project_id',
    ];

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assignee_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function comments()
    {
        return $this->hasMany(Comments::class);
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
