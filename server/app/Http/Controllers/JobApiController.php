<?php

namespace App\Http\Controllers;
use App\Models\Categories;
use App\Models\Company;

use App\Models\Job;

use App\Traits\ApiResponseWithHttpSTatus;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\JobAddAdmin;

class JobApiController extends Controller
{
    //
    use ApiResponseWithHttpSTatus;
    public function index()
    {
        $data['categories'] = Categories::all();
       
      
        return $this->apiResponse('success',$data,Response::HTTP_OK,true);
    }
    public function getALlJobs()
    {
        $data['jobs'] = Job::select('position', 'type','status','salary','id','description','close_day', 'company_id')
        ->with('company:id,company_name,address,logo',)
        ->where('status', 'Open') 
        ->get();

    return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }

    public function getJobDetails($id)
{
    $data['job'] = Job::where('id', $id)->with('categories:id')->with('company:id,company_name,address,logo')->first();
    $data['similar'] = Job::where([['status','active'],['cat_id',$data['job']->cat_id]])->get();
    return $this->apiResponse('success', $data, Response::HTTP_OK, true);
}

public function addJob(Request $request)
{
    // Lấy thông tin công việc từ re
    $token=$request->token;
    $company = Company::where("token", $token)->first();
    $position = $request->input('position');
    $cat_id = $request->input('cat_id');
    $status = $request->input('status', 'waiting');
    $description = $request->input('description');
    $salary = $request->input('salary');
    $type = $request->input('type');
    $closeDay = $request->input('close_day');

    // Thực hiện logic để thêm công việc vào cơ sở dữ liệu
    $job = new Job();
    $job->company_id = $company->id;
    $job->position = $position;
    $job ->cat_id = $cat_id;
    $job->status = $status;
    $job->description = $description;
    $job->salary = $salary;
    $job->type = $type;
    $job->close_day = $closeDay;
    $job->save();
    Mail::to('vien.nguyen24@student.passerellesnumeriques.org')->send(new JobAddAdmin($position,$type,$description, $salary, $closeDay,$status, ));
   

    return response()->json($job);
}
public function updateJob(Request $request, $id)
{
    // Lấy thông tin công việc từ request
    $position = $request->input('position');
    $status = $request->input('status');
    $description = $request->input('description');
    $salary = $request->input('salary');
    $type = $request->input('type');
    $closeDay = $request->input('close_day');

    // Tìm công việc theo ID
    $job = Job::find($id);

    if (!$job) {
        return response()->json(['error' => 'Không tìm thấy công việc']);
    }

    // Cập nhật thông tin công việc
    $job->position = $position;
    $job->status = $status;
    $job->description = $description;
    $job->salary = $salary;
    $job->type = $type;
    $job->close_day = $closeDay;
    $job->save();

    return response()->json(['message' => 'Công việc đã được cập nhật thành công']);
}
    public function deleteJob($id)
{
    // Tìm và xóa công việc theo ID
    $job = Job::find($id);

    if (!$job) {
        return response()->json(['error' => 'Không tìm thấy công việc']);
    }

    $job->delete();

    return response()->json(['message' => 'Công việc đã được xóa thành công']);
}

}
