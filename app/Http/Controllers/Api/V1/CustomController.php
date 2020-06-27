<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomController extends Controller
{
    public function photoUpload(Request $request) {
        $image = $request->file('file');
        $fileName   = time() . '.' . $image->getClientOriginalExtension();            
        $response = $request->file('file')->move('images', $fileName);

        if ( strtoupper($image->getClientOriginalExtension()) == "JPG" || 
             strtoupper($image->getClientOriginalExtension()) == "PNG" ||
             strtoupper($image->getClientOriginalExtension()) == "JPEG" ) $fileName = "http://".$request->getHttpHost()."/".$response;

        return response()->json($fileName);
    }

    public function videoUpload(Request $request) {
        $file = $request->file('file');
        // $filename  = $file->getClientOriginalName();
        // $pic   = date('His').'-'.$filename;
        // $file->move('images', $pic);

        // $video = file_get_contents($v);
        // // Storage::disk('local')->put('name of the video', $video);
        // $result['filename'] = $video;

        return response()->json($request->all());
    }
}
