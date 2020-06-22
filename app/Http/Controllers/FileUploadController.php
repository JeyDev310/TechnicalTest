<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    //
    public function uploadFile(Request $req)
    {
        $file = $req->file('file');
        $fileName = time() . '.' . $file->getClientOriginalExtension();
        return $file->move('files', $fileName);
    }
}
