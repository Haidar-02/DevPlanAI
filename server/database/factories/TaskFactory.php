<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $minDate = Carbon::now()->addDay(); 
        $maxDate = Carbon::now()->addMonths(6); 
        return [
            "title"=>fake()->sentence(2),
            'description'=>fake()->paragraph(3),
            'deadline' => fake()->dateTimeBetween($minDate, $maxDate)->format("Y-m-d"),
            'is_done' => false,
            'assignee_id'=>User::all()->pluck('id')->random(),
            'project_id'=>Project::all()->pluck('id')->random(),
            'created_at'=>now(),
            'updated_at'=>now(),
        ];
    }
}
