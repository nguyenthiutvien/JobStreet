<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "token" => "required",
            "content"=>"required",
            "post_id"=>"required"
        ]);
        $token=$request->token;
        $post_id=$request->post_id;
        $content=$request->content;
        $user=User::where("token",$token)->first();
        if($user){
            $comment=new Comment();
            $comment->user_id=$user->id;
            $comment->post_id=$post_id;
            $comment->content=$content;
            $comment->save();
            return response()->json([
                "status" => 200
            ]);
        }
        return response()->json([
            "status" => 500
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // $post_id=$request->post_id;
        $user_comment=Comment::where("post_id",$id)
        ->join("users","comments.user_id","=","users.id")
        ->join("posts","comments.post_id","=","posts.id")
        ->select("users.username","users.avatar","comments.content")
        ->groupBy("users.id", "users.username", "users.avatar", "comments.content")
        ->get();
        return response()->json($user_comment);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
