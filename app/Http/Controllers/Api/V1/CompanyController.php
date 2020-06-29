<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Company;

class CompanyController extends Controller
{
    public function index()
    {
        $items = DB::table('companies')
            ->get();
        return response()->json($items);
    }

    public function insert(Request $request)
    {
        $company = Company::create($request->all());
        $result['result'] = 'OK';
        $result['data'] = $company;
        $result['message'] = 'New company is inserted successfully';
        return response()->json($result);
    }

    public function update(Request $request)
    {
        $id = $request->get('id');
        $company = Company::findOrFail($id);
        $company->update($request->all());
        $result['result'] = 'OK';
        $result['data'] = $company;
        $result['message'] = 'The company is updated successfully';
        return response()->json($result);
    }

    public function delete(Request $request)
    {
        $id = $request->get('id');
        $course = Company::find($id);
        $course->delete();
        $result['result'] = 'OK';   
        $result['message'] = 'The company is deleted successfully';
        return response()->json($result);
    }
}