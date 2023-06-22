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
        $applications = Application::all();
        return response()->json($applications);
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
    public function show($email)
    {
        $apply=Job::join("companies","jobs.company_id","=","companies.id")
        ->join("applications","jobs.id","=","applications.job_id")
        ->join("users","applications.user_id","=","users.id")
        ->select("companies.company_name","jobs.position","applications.status","applications.created_at")
        ->where("users.email",$email)
        ->get();
        return response()->json($apply);
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

    public function getApplication($user_id, $job_id)
    {
        // Xử lý logic để lấy application dựa trên cả user_id và job_id
        $application = Application::where('user_id', $user_id)
                                  ->where('job_id', $job_id)
                                  ->first();

        if ($application) {
            // Đã tìm thấy application, xử lý theo yêu cầu của bạn
            return response()->json($application);
        } else {
            // Không tìm thấy application
            return response()->json('Application not found', 404);
        }
    }
    public function getCV($user_id, $job_id)
    {
        $application = Application::where('user_id', $user_id)
                                  ->where('job_id', $job_id)
                                  ->first();
        
        if ($application && $application->cv) {
            $path = storage_path('app/public/' . $application->cv);
            return response()->file($path);
        } else {
            return response()->json('CV not found', 404);
        }
    }

    public function getApplicationsByJob($job_id)
    {
        // Xử lý logic để lấy danh sách applications dựa trên job_id
        $applications = Application::where('job_id', $job_id)->get();

        return response()->json($applications);
    }
    
    

}
