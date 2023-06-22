<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

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
        $request->validate([
            'user_id'=>'required',
            'title' => 'required',
            'body' => 'required',
            'image'=>'nullable'
        ]);
        $post=new Post();
        $post-> user_id =$request-> user_id ;
        $post-> body=$request-> body;
        $post-> title =$request->  title ;
        if ($request->hasFile("image")) {
            $image = $request->file("image");
            $imageName =Str::random(16) . "." . $image->getClientOriginalExtension();
            Storage::disk("public")->put($imageName, file_get_contents($image));
            $post->image = $imageName;
        }
        $post-> save();

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
    

