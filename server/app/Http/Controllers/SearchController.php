<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Company;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $positions = $request->input('positions');
        $types = $request->input('types');
        $address = $request->input('address');

        // Thực hiện truy vấn để lấy dữ liệu công việc dựa trên positions và types
        $jobs = Job::whereIn('position', explode(',', $positions))
            ->whereIn('type', explode(',', $types))
            ->get();

        // Lấy dữ liệu địa chỉ từ bảng companies dựa trên company_id trong bảng jobs
        $companyIds = $jobs->pluck('company_id');
        $companies = Company::whereIn('id', $companyIds)->get();

        // Gộp dữ liệu công việc và địa chỉ vào một mảng
        $results = $jobs->map(function ($job) use ($companies) {
            $company = $companies->firstWhere('id', $job->company_id);
            $job->address = $company ? $company->address : null;
            return $job;
        });

        return response()->json($results);
    }
}
