<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Role;
use App\Models\User;
use App\Models\Permission;
use App\Services\RoleService;
use Illuminate\Http\JsonResponse;

class RoleController extends Controller
{
    public function __construct(private RoleService $service)
    {
    }

    public function index(): JsonResponse
    {
        return response()->json($this->service->all());
    }

    public function store(StoreRoleRequest $request): JsonResponse
    {
        $role = $this->service->create($request->validated());

        return response()->json($role, 201);
    }

    public function show(Role $role): JsonResponse
    {
        return response()->json($role);
    }

    public function update(UpdateRoleRequest $request, Role $role): JsonResponse
    {
        $role = $this->service->update($role, $request->validated());

        return response()->json($role);
    }

    public function destroy(Role $role): JsonResponse
    {
        $this->service->delete($role);

        return response()->noContent();
    }

    public function assignPermission(Role $role, Permission $permission): JsonResponse
    {
        $this->service->assignPermission($role, $permission);

        return response()->json(['message' => 'Permission assigned']);
    }

    public function removePermission(Role $role, Permission $permission): JsonResponse
    {
        $this->service->removePermission($role, $permission);

        return response()->json(['message' => 'Permission removed']);
    }

    public function assignToUser(Role $role, User $user): JsonResponse
    {
        $this->service->assignToUser($role, $user);

        return response()->json(['message' => 'Role assigned']);
    }

    public function removeFromUser(Role $role, User $user): JsonResponse
    {
        $this->service->removeFromUser($role, $user);

        return response()->json(['message' => 'Role removed']);
    }
}
