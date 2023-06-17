<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use App\Mail\ForgotPassword;
use App\Mail\RegisterEmail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json(
            $users
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function userLogin(Request $request)
    {
        $request->validate([
            "email" => "required",
            "password" => "required"
        ]);
        $user = User::where('email', $request->email)->first();

        if ($user && $user->password === $request->password) {
            return response()->json(
                [
                    "200"
                ]
            );
        }
        return response()->json([
            "400"
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'username' => "required|string",
            "avatar" => "nullable|string",
            'email' => "required|string",
            'password' => "required|string",
            "number_phone" => "required|string",
            "address" => "required|string"
        ]);
        $user = User::create(
            [
                'username' => $request->username,
                "avatar" => "user.png",
                'email' => $request->email,
                'password' => $request->password,
                "number_phone" => $request->number_phone,
                "address" => $request->address
            ]
        );
        Mail::to($request->email)->send(new RegisterEmail($request->username));
        return response()->json(
            $user
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($email)
    {
        $user = User::where("email", $email)->first();
        return response()->json(
            $user
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $request->validate([
            'username' => "required|string",
            'avatar' => "nullable",
            'number_phone' => "required|numeric",
            'address' => "required|string"
        ]);

        $id = $request->id;
        $username = $request->username;
        $phone_number = $request->number_phone;
        $address = $request->address;
        $user = User::findOrFail($id);
        if ($request->hasFile("avatar")) {
            $avatar=$request->file("avatar");
            $avatarName = Str::random(16) . "." . $request->avatar->getClientOriginalExtension();
            Storage::disk("public")->put($avatarName, file_get_contents($avatar));
            $user->avatar = $avatarName;
        }
        $user->username = $username;
        $user->number_phone = $phone_number;
        $user->address = $address;
        $user->save();
        return response()->json(
            "Cập nhật thành công"
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function recoverPass(Request $request, $email)
    {
        $request->validate([
            "password" => "required|string|min:8"
        ]);
        $user = User::where("email", $email)->first();
        if (!$user) {
            return response()->json(
                "Tài khoản không tồn tại"
            );
        }
        $user->password = $request->password;
        $user->save();
        return response()->json(
            "Thành công"
        );
    }

    public function confirmEmail(Request $request)
    {
        $confirmemail = $request->email;
        $user = User::where("email", $confirmemail)->first();
        if ($user) {
            $verificationCode =  Str::random(6);
            Mail::to($confirmemail)->send(new ForgotPassword($verificationCode));
        }
        return response()->json(
            $verificationCode
        );
    }

    public function userChangePassword(Request $request){
            $id=$request->id;
            $user=User::where("id",$id)->first();
            $user->password = $request->passwor;
            $user->save();
            if($user){
                return response()->json("Thành công");
            }
    }
}
