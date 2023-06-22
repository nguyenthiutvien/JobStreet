<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Company;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $position = $request->input('position');
        $type = $request->input('type');
        $address = $request->input('address');



        // Ví dụ: Tìm kiếm công việc và trả về kết quả
        $jobs = Job::where('position', $position)
                    ->where('type', $type)
                    ->get();

        // Tìm kiếm công ty và trả về kết quả
        $companies = Company::where('address', $address)
                            ->get();

        // Kết hợp kết quả công việc và công ty để trả về
        $results = [
            'jobs' => $jobs,
            'companies' => $companies
        ];

        return response()->json($results);
    }

}

