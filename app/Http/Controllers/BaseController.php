<?php

namespace App\Http\Controllers;
use Illuminate\Routing\Controller as IlluminateController;

class BaseController extends IlluminateController
{
    public function pass($data, $status = 200)
    {
        return response()->json(
            [
                "data" => $data
            ],
            $status
        );
    }

    public function fail($message, $status)
    {
        return response()->json(
            [
                "message" => $message
            ],
            $status
        );
    }
}
