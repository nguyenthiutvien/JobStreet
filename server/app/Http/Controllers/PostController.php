<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;


class PostController extends Controller
{
/**
* Display a listing of the resource.
*/
    public function index()
    {
        $posts = Post::select('id','title','image','body','user_id')->with('user:id,avatar')->get();
        return response()->json($posts);
    }
/**
* Store a newly created resource in storage.
*/
    public function store(Request $request)
    {
        $post = new Post();
        $post->title = $request->input('title');
        $post->content = $request->input('content');
        $post->save();

    return response()->json(['message' => 'Post created successfully']);
    }

/**
* Display the specified resource.
*/
    public function show(string $id)
    {
        $post = Post::find($id);
        if (!$post) {
        return response()->json(['message' => 'Post not found'], 404);
        }
        return response()->json($post);
    }

    public function update(Request $request, string $id)
    {
        $post = Post::find($id);
        if (!$post) {
        return response()->json(['message' => 'Post not found'], 404);
        }

        $post->title = $request->input('title');
        $post->content = $request->input('content');
        $post->save();

        return response()->json(['message' => 'Post updated successfully']);
    }

    /**
    * Remove the specified resource from storage.
    */
    public function destroy(string $id)
        {
        $post = Post::find($id);
        if (!$post) {
        return response()->json(['message' => 'Post not found'], 404);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
        }
    }

