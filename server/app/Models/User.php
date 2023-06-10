<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


class User extends Authenticatable
{
    use  HasFactory;
    protected $fillable = [
        'username',
        "avatar",
        'email',
        'password',
        "number_phone",
        "address"
    ]; 

    public function post()
    {
        return $this->hasMany(Post::class);
    }

    public function comment()
    {
        return $this->hasMany(Comment::class);
    }

    public function contact()
    {
        return $this->hasMany(Contact::class);
    }

    public function application()
    {
        return $this->hasMany(Application::class);
    }
}
