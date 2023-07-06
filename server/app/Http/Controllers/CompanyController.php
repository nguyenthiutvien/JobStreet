<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Mail\ForgotPassword;
use App\Mail\RegisterEmail;
use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


use App\Models\Job;
use Faker\Provider\ar_EG\Address;

use Illuminate\Support\Facades\DB;
class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $company=Company::all();
        return response()->json(
            $company
        );
    }
  

    public function selectData()
    {
    $results = Company::leftJoin('jobs', 'companies.id', '=', 'jobs.company_id')
        ->select(
            DB::raw('SUM(CASE WHEN jobs.status = "open" THEN 1 ELSE 0 END) AS count'),
            'companies.id',
            'companies.company_name',
            'companies.logo',
            'companies.address',
            'companies.number_phone',
            DB::raw('GROUP_CONCAT(CASE WHEN jobs.status = "open" THEN jobs.position ELSE "Không có vị trí nào đang tuyển" END) AS positions')
        )
        ->where('jobs.status', 'open')
        ->groupBy('companies.id', 'companies.company_name', 'companies.logo', 'companies.address', 'companies.number_phone','companies.id')
        ->get();

    return response()->json($results);


   
    }



public function getCompany(Request $request, $companyId)
{
    $results = Company::leftJoin('jobs', 'companies.id', '=', 'jobs.company_id')
        ->select(
            DB::raw('SUM(CASE WHEN jobs.status = "open" THEN 1 ELSE 0 END) AS count'),
            
            'companies.id',
            'jobs.id as job_id',
            'companies.company_name',
            'companies.logo',
            'companies.address',
            'companies.number_phone',
            'companies.email',
            'companies.scale',
            'companies.website',
            'jobs.salary',
            'jobs.description',
            'jobs.type',
            'jobs.close_day',
            DB::raw('GROUP_CONCAT(CASE WHEN jobs.status = "open" THEN jobs.position ELSE "Không có vị trí nào đang tuyển" END) AS positions')
        )
        ->where('companies.id', '=', $companyId)
        ->groupBy('companies.id', 'companies.company_name', 'companies.logo', 'companies.address', 'companies.number_phone', 'companies.email','companies.id','jobs.salary', 'jobs.description','companies.scale','companies.website','jobs.id','jobs.type','jobs.close_day')
        ->get();

    return response()->json($results);
}





// public function getPositionById($id)
// {
//     $job = Job::find($id);

//     if ($job) {
//         return response()->json(['position' => $job->position]);
//     } else {
//         return response()->json(['error' => 'Job not found'], 404);
//     }
// }

    // ---------------------------------------------------------------
    public function getJobs()
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function EmployeeLogin(Request $request)
    {
        $request->validate([
            "email"=>"required",
            "password"=>"required"
        ]);
        $company=Company::where('email',$request->email)->first();
        if($company && $company->password === $request->password){
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
            'company_name'=>"required|string",
            'logo'=>"nullable|string",
            "scale"=>"required|string",
            "description"=>"required|string",
            "website"=>"required|string",
            'email'=>"required|string",
            'password'=>"required|string",
            'address'=>"required|string",
            'number_phone'=>"required|numeric"
        ]);
        $company=Company::create([
            'company_name'=>$request->company_name,
            'logo'=>"company.png",
            'scale'=>$request->scale,
            'description'=>$request->description,
            'website'=>$request->website,
            'email'=>$request->email,
            'password'=>$request->password,
            'address'=>$request->address,
            'number_phone'=>$request->number_phone
        ]);
        if(!$company){
            return response()->json(
                    "Không thể chèn"
            );
        }
      
        Mail::to($request->email)->send(new RegisterEmail($request->company_name));
        return response()->json(
            $company
        );
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
    public function edit($email)
    {
        $company= Company::where("email",$email)->first();
        return response()->json(
            $company
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$email)
    {
        $request->validate([
            "password"=>"required|string|min:8"
        ]);

        $company=Company::where("email",$email)->first();

        if (!$company) {
            return response()->json(
                "Công ty không tồn tại"
            );
        }
        $company->password=$request->password;
        $company->save();
        return response()->json(
            "Thành công"
        );
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function confirmEmail(Request $request){
        $companyEmail=$request->email;

        $company=Company::where("email",$companyEmail)->first();

        if ($company) {
          $verificationCode=Str::random(6);
          Mail::to($companyEmail)->send(new ForgotPassword($verificationCode));
        }

        return response()->json(
            $verificationCode
        );
    }


    //  get username- user
    // public function getUser()
    // {
    //     $users = DB::table('users')->select('username')->get();
    //     return response()->json($users);
    // }
    public function getUser()
    {
        $users = DB::table('users')->get();
        return response()->json($users);
    }

    //  get username- companies
    // public function getCompanyname()
    // {
    //     $companies = DB::table('companies')->select('company_name')->get();
    //     return response()->json($companies);
    // }
    public function getCompanyname()
{
    $companies = DB::table('companies')->get();
    return response()->json($companies);
}


// controller  company/---------------------------------
public function countCompany()
{
    $companyCount = Company::count();

    return $companyCount;
}
}
