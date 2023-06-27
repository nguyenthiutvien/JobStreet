<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Traits\ApiResponseWithHttpSTatus;
use Illuminate\Http\Request;
use ApiResponseWithHttpSTatus;
use App\Models\Categories;
use Illuminate\Http\Response;

class CategoriesController extends Controller
{
    use ApiResponseWithHttpSTatus;
    public function __construct() {
   
    }
    public function index()
    {
        $data['categories'] = Categories::all();
        return $this->apiResponse('success',$data,Response::HTTP_OK,true);
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
