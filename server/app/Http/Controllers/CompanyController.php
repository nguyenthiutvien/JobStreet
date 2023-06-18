<?php

namespace App\Http\Controllers;
use App\Models\Company;
use App\Models\Job;
use Faker\Provider\ar_EG\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        ->groupBy('companies.id', 'companies.company_name', 'companies.logo', 'companies.address', 'companies.number_phone', 'companies.email','companies.id','jobs.salary', 'jobs.description','companies.scale','companies.website',)
        ->get();

    return response()->json($results);
}


    // ---------------------------------------------------------------
    public function getdetail()
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
        //
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
