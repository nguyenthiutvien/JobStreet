<?php

namespace App\Http\Controllers;
use Illuminate\Support\Str;
use App\Mail\ForgotPassword;
use App\Mail\RegisterEmail;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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
            'email'=>"required|string",
            'password'=>"required|string",
            'address'=>"required|string",
            'number_phone'=>"required|numeric"
        ]);

        $company=Company::create([
            'company_name'=>$request->company_name,
            'logo'=>"company.png",
            'email'=>$request->email,
            'password'=>$request->password,
            'address'=>$request->address,
            'number_phone'=>$request->number_phone
        ]);

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
}
