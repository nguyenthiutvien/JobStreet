<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $fillable=[
        "company_name",
        "logo",
        "email",
        "password",
        "address",
        "number_phone"
    ];

    public function job()
    {
        return $this->hasMany(Job::class);
    }
}
