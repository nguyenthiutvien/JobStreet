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

}

