<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            "name" =>"required|string",
            "email" =>"required|string",
            "file_cv"=>"required|string",
            "cover_letter"=>"required|string",
            "job_id"=>"required"
        ]);
        $email=$request->email;
        $filev_cv=$request->filev_cv;
        $name=$request->name;
        $id_job=$request->id_job;
        $user=User::where("email",$email)->first();
        $application=new Application();
        $fileName=Str::random(15).".".$request->filev_cv->getClientOriginalExtension();
        $application->user_id=$user->id;
        $application->job_id=$id_job;
        if($request->hasFile("filev_cv")){
            $cv=$request->file("filev_cv");
            $cvName=$cv->getClientOriginalName();
            Storage::disk("public")->put($fileName,file_get_contents($request->file_cv));
            $application->cv=$fileName;
        }
        $application->status="Đang tiếp nhận";
        $application->save();
    }
 
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
