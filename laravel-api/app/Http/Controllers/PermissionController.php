<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use App\Services\PermissionService;
use Illuminate\Http\JsonResponse;

class PermissionController extends Controller
{
    public function __construct(private PermissionService $service)
    {
    }

    public function index(): JsonResponse
    {
        return response()->json($this->service->all());
    }

    public function store(StorePermissionRequest $request): JsonResponse
    {
        $permission = $this->service->create($request->validated());

        return response()->json($permission, 201);
    }

    public function show(Permission $permission): JsonResponse
    {
        return response()->json($permission);
    }

    public function update(UpdatePermissionRequest $request, Permission $permission): JsonResponse
    {
        $permission = $this->service->update($permission, $request->validated());

        return response()->json($permission);
    }

    public function destroy(Permission $permission): JsonResponse
    {
        $this->service->delete($permission);

        return response()->noContent();
    }

    public function assignToRole(Permission $permission, Role $role): JsonResponse
    {
        $this->service->assignToRole($permission, $role);

        return response()->json(['message' => 'Permission assigned']);
    }

    public function removeFromRole(Permission $permission, Role $role): JsonResponse
    {
        $this->service->removeFromRole($permission, $role);

        return response()->json(['message' => 'Permission removed']);
    }

    public function assignToUser(Permission $permission, User $user): JsonResponse
    {
        $this->service->assignToUser($permission, $user);

        return response()->json(['message' => 'Permission assigned']);
    }

    public function removeFromUser(Permission $permission, User $user): JsonResponse
    {
        $this->service->removeFromUser($permission, $user);

        return response()->json(['message' => 'Permission removed']);
    }
}
