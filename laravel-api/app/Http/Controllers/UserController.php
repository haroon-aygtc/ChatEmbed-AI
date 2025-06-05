<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function __construct(private UserService $service)
    {
    }

    public function index(): JsonResponse
    {
        return response()->json($this->service->all());
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = $this->service->create($request->validated());

        return response()->json($user, 201);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json($user);
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $user = $this->service->update($user, $request->validated());

        return response()->json($user);
    }

    public function destroy(User $user): JsonResponse
    {
        $this->service->delete($user);

        return response()->noContent();
    }
}
