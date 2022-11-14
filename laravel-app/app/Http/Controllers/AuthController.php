<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(Request $request)
    {
        // $request->validated($request->all());


        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string', 'min:8']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ]);
        }
        $user = User::where('email', $request->email)->first();
        // if (!Auth::attempt($request->only(['email', 'password']))) {
        //     // return $this->error('', 'Credentials do not match!', 401);
        //     return response()->json([
        //         'errors' => ['email' => 'Credentials do not match!'],
        //     ]);
        // }

        if (!$user || !Hash::check($request->password, $user->password)) {
            // throw ValidationException::withMessages([
            //     'email' => ['The provided credentials are incorrect.'],
            // ]);
            return response()->json([
                'errors' => ['email' => 'Credentials do not match!'],
            ]);
            // return $this->error('', 'Credentials do not match!', 401);
        }

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API token of ' . $user->name)->plainTextToken
        ]);
    }

    public function register(Request $request)
    {
        // $validator = $request->validated($request->all());
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Password::defaults(), 'min:8']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->messages(),
            ]);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token of ' . $user->name)->plainTextToken
        ]);
    }

    public function logout()
    {
        // auth('sanctum')->user->tokens()->delete();
        // Auth::logout();
        // Auth::guard('web')->logout();
        // auth('sanctum')->user->currentAccessToken()->delete();
        Auth::user()->currentAccessToken()->delete();
        // $request->user()->currentAccessToken()->delete();


        return $this->success([
            'message' => 'you logged out successfully.'
        ]);
    }

    public function user()
    {
        return $this->success([
            'user' => Auth::user(),
        ]);
    }
}
