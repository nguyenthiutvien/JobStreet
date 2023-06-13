<?php

namespace App\Http\Controllers;

use App\Mail\NotificationToCandidate;
use App\Mail\NotificationToEmployee;
use App\Models\Application;
use App\Models\Job;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
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
            "email" => "required|string",
            "job_id" => "required|numeric",
            "cv" => "nullable",
            "name" => "required",
            "cover_letter" =>"nullable",
            "position" => "required",
            "status" => "required",
        ]);

        $email = $request->email;
        $job_id = $request->job_id;
        $name=$request->name;
        $cover_letter=$request->cover_letter;
        $position=$request->position;
        $status="Đã nhận";
        
        $user = User::where("email", $email)->first();
        $application=new Application();
        $application->user_id = $user->id;
        $application->job_id = $job_id;
        $fileName=Str::random(20).".".$request->cv->getClientOriginalExtension();
        if ($request->hasFile("cv")) {
            Storage::disk("public")->put($fileName,file_get_contents($request->cv));
            $application->cv = $fileName;
        }
        $application->status = $status;
        $application->save();

        $job=Job::join("companies","jobs.company_id","=","companies.id")
                ->select("companies.*")
                -> where("jobs.id",$job_id)->first();
        if ($application) {
            Mail::to($job->email)->send(new NotificationToEmployee($name,$cover_letter,$fileName,$job->company_name));
            Mail::to($request->email)->send(new NotificationToCandidate($name,$job->company_name));
            return response()->json([
                "Thành công"=> $application,
                  "name"=>$name,
                  "cover_letter"=>$cover_letter,
                  "position"=>$position,
              ]);
        }
       return response()->json("Thất bại");
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
