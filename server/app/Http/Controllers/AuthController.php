<?php
        namespace App\Http\Controllers;

        use App\Models\User;
        use Illuminate\Http\Request;
        use Illuminate\Support\Facades\Auth;
        use Illuminate\Support\Facades\Hash;
        
        class AuthController extends Controller
        {
            public function login(Request $request)
            {
                try{
                    $request->validate([
                        'email' => 'required|string|email',
                        'password' => 'required|string',
                    ]);
        
                    $credentials = $request->only('email', 'password');
        
                    if (Auth::attempt($credentials)) {
                        $user = Auth::user();
                        $token = Auth::attempt($credentials);        
                        return response()->json([
                            'status' => 'success',
                            'user' => $user,
                            'token' => $token,
                        ]);
                    }
        
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Wrong email or password',
                    ], 401);
                }catch (\Exception $e) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Login failed, try again later',
                    ], 500);
                }
            }
        
            public function register(Request $request)
            {
                try {
                    $request->validate([
                        'first_name' => 'required|string|max:255',
                        'last_name' => 'required|string|max:255',
                        'email' => 'required|string|email|max:255',
                        'password' => 'required|string|min:6',
                        'profile_picture' => 'nullable',
                    ]);
            
                    $existingUser = User::where('email', $request->email)->first();
            
                    if ($existingUser) {
                        return response()->json([
                            'status' => 'error',
                            'message' => 'Email already in use',
                        ], 422);
                    }
            
                    $user = User::create([
                        'first_name' => $request->first_name,
                        'last_name' => $request->last_name,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                        'user_type_id' => 2,
                        'profile_picture' => $request->profile_picture,
                    ]);
            
                    $token = Auth::login($user);
            
                    return response()->json([
                        'status' => 'success',
                        'message' => 'User created successfully',
                        'user' => $user,
                        'token' => $token,
                    ]);
                } catch (\Exception $e) {
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Registration failed, try again later',
                    ], 500);
                }
            }
        
            public function logout()
            {
                try{
                Auth::logout();
                return response()->json([
                'status' => 'success',
                'message' => 'Successfully logged out',]);
                }catch(\Exception $e){
                    return response()->json([
                        'status' => 'error',
                        'message' => 'Logout failed, try again later',
                    ], 500);
                }
            }
            
            public function refresh()
            {
                try{
                $user = Auth::user();
                $token = Auth::refresh();
        
                return response()->json([
                    'status' => 'success',
                    'user' => $user,
                    'token' => $token,
                ]);
            }catch(\Exception $e){
                return response()->json([
                    'status' => 'error',
                    'message' => 'Refresh failed, try again later',
                ], 500);
            }
            }
        }
        
