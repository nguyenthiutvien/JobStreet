<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Mail\ForgotPassword;
use App\Mail\RegisterEmail;
use App\Models\Company;

use App\Models\User;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Tymon\JWTAuth\Facades\JWTAuth;

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
            DB::raw('GROUP_CONCAT(CASE WHEN jobs.status = "open" THEN jobs.position ELSE "Không có vị trí nào đang tuyển" END) AS positions')
        )
        ->where('companies.id', '=', $companyId)
        ->groupBy('companies.id', 'companies.company_name', 'companies.logo', 'companies.address', 'companies.number_phone', 'companies.email','companies.id','jobs.salary', 'jobs.description','companies.scale','companies.website','jobs.id')
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
    public function getJobByCompany($token)
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function EmployeeLogin(Request $request)
    {

        if(empty($request->email)){
            return response()->json([
                "status" => "empty_email",
                'message' => 'Vui lòng nhâp email của bạn'
            ]);
        }elseif(empty($request->password)){
            return response()->json([
            "status" => "empty_password",
              'message' => 'Vui lòng nhâp mật khẩu của bạn'
            ]);
        }else{
            $companies=$request->only("email","password");
            if(Auth::guard('companies')->attempt($companies)){
                $company = Auth::guard('companies')->user();
                $token=$company->token;
            }else{
                return response()->json([
                    "status"=>404,
                    "message"=>"Tài khoản hoặc mật khẩu sai"
                ]);
            }
            return response()->json([
                "status"=>200,
                'token' => $token]
            );
        }

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

        $company=new Company();
        $company->company_name=$request->company_name;
        $company->logo="company.png";
        $company->scale=$request->scale;
        $company->description=$request->description;
        $company->website=$request->website;
        $company->email=$request->email;
        $company->password=bcrypt($request->password);
        $company->address=$request->address;
        $company->number_phone=$request->number_phone;
        $company->save();
        
        if(Auth::guard('companies')->attempt(["email"=>$request->email, "password"=>$request->password])){
            $company=Auth::guard('companies')->user();
            $token=JWTAuth::fromUser($company);
            $company->token=$token;
            $company->save();

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

        if(!$company){
            return response()->json([
                "status"=>400,
                "message" => "Tài khoản không tồn tại"
            ]);
        }
        return response()->json(
            [ 
            "status"=>200,
            "user" => $company
         
            ]
           

        );
    }

    /**
     * Update the specified resource in storage.
     */
      //public function update(Request $request,$email)
     // {
        // $request->validate([
        //     "password"=>"required|string|min:8"
        // ]);

        $company=Company::where("email",$email)->first();

        if (!$company) {
            return response()->json(
                "Công ty không tồn tại"
            );
        }
        $company->password=bcrypt($request->password);
        $company->save();
        return response()->json(
            "Thành công"
        );
     }

    public function updateCompanyInfo(Request $request, $email)
    {
        $request->validate([
            'company_name' => "required|string",
            'logo' => "nullable",
            'scale' => "required|numeric",
            'description' => "required|string",
            'website' => "required|string",
            'address' => "required|string",
            'number_phone' => "required|numeric",
        ]);

        $company=Company::where("email",$email)->first();

        if (!$company) {
            return response()->json(
                "Công ty không tồn tại"
            );



        $id = $request->id;
        $company_name = $request->company_name;
        $logo = $request -> logo;
        $scale = $request -> scale;
        $website = $request -> website;
        $address = $request->address;
        $phone_number = $request->number_phone;
        $company = Company::findOrFail($id);
        if ($request->hasFile("logo")) {
            $logo=$request->file("logo");
            $logoName = Str::random(16) . "." . $request->logo->getClientOriginalExtension();
            Storage::disk("public")->put($logoName, file_get_contents($logo));
            $company->avatar = $logoName;

        }
        $company->company_name = $company_name;
        $company -> scale = $scale;
        $company -> website = $website;
        $company->number_phone = $phone_number;
        $company->address = $address;

        $company->save();
        return response()->json(
            "Cập nhật thành công"

        );
    }
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
            $verificationCode =strval(rand(100000, 999999));
          Mail::to($companyEmail)->send(new ForgotPassword($verificationCode));
        }

        return response()->json(
            $verificationCode
        );
    }



    public function getCompanyToken($token){
        $company = Company::where("token", $token)->first();
        if(!$company){
            return response()->json([
                "status"=>400,
                "message" => "Tài khoản không tồn tại"
            ]);
        }
        return response()->json(
            [ 
            "status"=>200,
            "company" => $company
            ]
           
        );
    }


    //  get username- user
    // public function getUser()
    // {
    //     $users = DB::table('users')->select('username')->get();
    //     return response()->json($users);
    // }


    // admin user ---------------------------------------------------------
    public function getUser()
    {
        $users = DB::table('users')->get();
        return response()->json($users);
    }

    
    public function deleteUsers(Request $request)
    {
        $user = User::find($request->id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['status' => 'ok', 'message' => 'Delete succeeded']);
    }	

    //  admin company------------------------------------

    public function getCompanyname()
{
    $companies = DB::table('companies')->get();
    return response()->json($companies);

}

public function deleteCompany(Request $request)
{
    $company = Company::find($request->id);

    if (!$company) {
        return response()->json(['error' => 'Company not found'], 404);
    }

    $company->delete();

    return response()->json(['status' => 'ok', 'message' => 'Delete succeeded']);
}	



public function getdatauser()
{
    $jobs = Job::select('jobs.position', 'companies.company_name', 'applications.status', 'users.username')
        ->join('companies', 'jobs.company_id', '=', 'companies.id')
        ->join('applications', 'jobs.id', '=', 'applications.job_id')
        ->join('users', 'users.id', '=', 'applications.user_id')
        ->get();

    return response()->json($jobs);
}
}

