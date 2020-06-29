<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomController extends Controller
{
    public function uploadFile(Request $request) {
        $file = $request->file('file');
        $fileName   = time() . '.' . $file->getClientOriginalExtension();            
        $response = $request->file('file')->move('upload', $fileName);

        // $fileName = "http://".$request->getHttpHost()."/".$response;
        return response()->json($fileName);
    }

    public function videoUpload(Request $request) {
        $file = $request->file('file');
        return response()->json($request->all());
    }
}
