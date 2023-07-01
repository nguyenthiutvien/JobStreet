<?php

namespace App\Http\Controllers;

use App\Mail\NotificationToCandidate;
use App\Mail\NotificationToEmployee;
use App\Models\Application;
use App\Models\Job;
use App\Models\User;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
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
            "token" => "required|string",
            "job_id" => "required|numeric",
            "cv" => "nullable",
            "name" => "required",
            "cover_letter" =>"nullable",
            "position" => "required",
            "status" => "required",
        ]);

        $token = $request->token;
        $job_id = $request->job_id;
        $name=$request->name;
        $cover_letter=$request->cover_letter;
        $position=$request->position;
        $status="Đã nhận";
        
        $user = User::where("token", $token)->first();
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
            Mail::to($user->email)->send(new NotificationToCandidate($name,$job->company_name));
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

    // public function getApplication($name)
    // {
    //     // Xử lý logic để lấy application dựa trên cả user_id và job_id
    //     $application = Application::where('cv', $name)
                                  
    //                               ->first();

    //     if ($application) {
    //         // Đã tìm thấy application, xử lý theo yêu cầu của bạn
    //         return response()->json($application);
    //     } else {
    //         // Không tìm thấy application
    //         return response()->json('Application not found', 404);
    //     }
    // }
    public function getCV($name)
{
    $application = Application::where('cv', $name)->first();

    if ($application && $application->cv) {
        $path = storage_path('app/public/' . $name);
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

    // public function getCompanyApplications($companyId)
    // {
    //     $applications = Application::whereHas('job', function ($query) use ($companyId) {
    //         $query->where('company_id', $companyId);
    //     })->get();

    //     return response()->json($applications);
    // }

//     public function getCompanyApplications(Request $request)
    
// {
//     $token=$request->token;
//     $company = Company::where('token', $token)->first();

//     if ($company) {
//         $applications = Application::whereHas('job', function ($query) use ($company) {
//             $query->where('company_id', $company->id);
//         })
//         ->with('user.email', 'job.position') 
//         ->get();

//         return response()->json($applications);
//     } else {
//         // Xử lý khi không tìm thấy công ty với email cụ thể
//     }
// }


// public function getApplicationsByCompany(Request $request)
// {
//     $token = $request->token;

//     // Tìm công ty dựa trên token
//     $company = Company::where('token', $token)->first();

//     if ($company) {
//         // Lấy danh sách các ứng dụng của công ty
//         $applications = Application::whereHas('job', function ($query) use ($company) {
//             $query->where('company_id', $company->id);
//         })->with('user', 'job')->get(['created_at', 'status', 'cv']);

//         return response()->json($applications);
//     } else {
//         return response()->json('Company not found', 404);
//     }


    
// }

// public function getApplicationsByCompany(Request $request)
//     {
//         $token = $request->token;

//         // Tìm công ty dựa trên token
//         $company = Company::where('token', $token)->first();

//         if ($company) {
//             // Lấy danh sách các ứng dụng của công ty
//             $applications = Application::whereHas('job', function ($query) use ($company) {
//                 $query->where('company_id', $company->id);
//             })->with('user:email', 'job:position')->get(['created_at', 'status', 'cv']);

//             return response()->json($applications);
//         } else {
//             return response()->json('Company not found', 404);
//         }
//     }

public function getApplicationByCompany($token)
{
   
    $applications = DB::table('applications')
        ->select('applications.created_at', 'applications.status', 'applications.user_id','applications.job_id','applications.cv', 'users.email', 'users.username' ,'jobs.position')
        ->join('users', 'users.id', '=', 'applications.user_id')
        ->join('jobs', 'jobs.id', '=', 'applications.job_id')
        ->join('companies', 'companies.id', '=', 'jobs.company_id')
        ->where('companies.token', $token)

                ->get();

    return response()->json($applications);
}



// public function updateStatus(Request $request, $user_id, $job_id)
// {
//     $application = Application::where('user_id', $user_id)
//                              ->where('job_id', $job_id)
//                              ->firstOrFail();
                             
//     $application->status = $request->input('status');
//     $application->save();

//     return response()->json(['message' => 'Status updated successfully']);
// }
public function AcceptApplication(Request $request, $token)
{
    $id = $request->id;
    $status = 'Đồng ý';
    // $user=User::all();
    $application=Application::select('applications.created_at', 'applications.status', 'applications.user_id','applications.job_id','applications.cv', 'users.email', 'users.username' ,'jobs.position')
    ->where('companies.token', $token)
    ->join('companies', 'jobs.company_id', '=', 'companies.id');
  
    $application = Job::findOrFail($id);
    $application->status = $status;
    $application->save();
    // Mail::to($company->email)->send(new Noticetothecompany("Chấp nhận",$company->company_name));
    // foreach ($user as $value) {
    //     // Mail::to($value->email)->send(new AdminBrowseInformation($value->username,$company->company_name,$job->position));
    // }
    return response()->json(
        "Cập nhật thành công"
    );
}

public function RejectApplication(Request $request, $token)
{
    $id = $request->id;
    $status = 'đồng ý';
    $user=User::all();
    $application=Application::select('applications.created_at', 'applications.status', 'applications.user_id','applications.job_id','applications.cv', 'users.email', 'users.username' ,'jobs.position')
    ->where('companies.token', $token)
    ->join('companies', 'jobs.company_id', '=', 'companies.id')
    ->first();
    $job = Job::findOrFail($id);
    $job->status = $status;
    $job->save();
    // Mail::to($company->email)->send(new Noticetothecompany("Chấp nhận",$company->company_name));
    foreach ($user as $value) {
        // Mail::to($value->email)->send(new AdminBrowseInformation($value->username,$company->company_name,$job->position));
    }
    return response()->json(
        "Cập nhật thành công"
    );
}


}



