<?php

namespace App\Http\Controllers;
use App\Models\Categories;
use App\Models\Job;
use App\Traits\ApiResponseWithHttpSTatus;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


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
        $data['jobs'] = Job::select('position', 'type','salary','id','description','close_day', 'company_id')
        ->with('company:id,company_name,address,logo',)
        ->get();

    return $this->apiResponse('success', $data, Response::HTTP_OK, true);
    }


    public function getJobDetails($id)
{
    $data['job'] = Job::where('id', $id)->with('categories:id')->with('company:id,company_name,address,logo')->first();
    $data['similar'] = Job::where([['status','active'],['cat_id',$data['job']->cat_id]])->get();
    return $this->apiResponse('success', $data, Response::HTTP_OK, true);
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

// public function updateJob(Request $request, $id)
// {
//     // Lấy thông tin công việc từ request
//     $position = $request->input('position');
//     $status = $request->input('status');
//     $description = $request->input('description');
//     $salary = $request->input('salary');
//     $type = $request->input('type');
//     $closeDay = $request->input('close_day');

//     // Tìm công việc theo ID
//     $job = Job::find($id);

//     if (!$job) {
//         return response()->json(['error' => 'Không tìm thấy công việc']);
//     }

//     // Cập nhật thông tin công việc
//     $job->position = $position;
//     $job->status = $status;
//     $job->description = $description;
//     $job->salary = $salary;
//     $job->type = $type;
//     $job->close_day = $closeDay;
//     $job->save();

//     return response()->json(['message' => 'Công việc đã được cập nhật thành công']);
// }
//     public function deleteJob($id)
// {
//     // Tìm và xóa công việc theo ID
//     $job = Job::find($id);

//     if (!$job) {
//         return response()->json(['error' => 'Không tìm thấy công việc']);
//     }

//     $job->delete();

//     return response()->json(['message' => 'Công việc đã được xóa thành công']);
// }
}