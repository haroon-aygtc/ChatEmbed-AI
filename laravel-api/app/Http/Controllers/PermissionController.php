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
    /****
     * Initializes the controller with a PermissionService instance for handling permission-related operations.
     */
    public function __construct(private PermissionService $service)
    {
    }

    /**
     * Returns a JSON response containing all permissions.
     *
     * @return JsonResponse List of all permissions.
     */
    public function index(): JsonResponse
    {
        return response()->json($this->service->all());
    }

    /**
     * Creates a new permission using validated request data.
     *
     * Returns the created permission as a JSON response with HTTP status 201.
     *
     * @return JsonResponse
     */
    public function store(StorePermissionRequest $request): JsonResponse
    {
        $permission = $this->service->create($request->validated());

        return response()->json($permission, 201);
    }

    /**
     * Returns a JSON response with the specified permission.
     *
     * @param Permission $permission The permission to retrieve.
     * @return JsonResponse JSON representation of the permission.
     */
    public function show(Permission $permission): JsonResponse
    {
        return response()->json($permission);
    }

    /****
     * Updates the specified permission with validated data and returns the updated permission as a JSON response.
     *
     * @param UpdatePermissionRequest $request The request containing validated update data.
     * @param Permission $permission The permission to update.
     * @return JsonResponse The updated permission in JSON format.
     */
    public function update(UpdatePermissionRequest $request, Permission $permission): JsonResponse
    {
        $permission = $this->service->update($permission, $request->validated());

        return response()->json($permission);
    }

    /**
     * Deletes the specified permission and returns a no-content JSON response.
     *
     * @param Permission $permission The permission to be deleted.
     * @return JsonResponse Empty response with HTTP 204 status code.
     */
    public function destroy(Permission $permission): JsonResponse
    {
        $this->service->delete($permission);

        return response()->noContent();
    }

    /**
     * Assigns the specified permission to the given role.
     *
     * @return JsonResponse JSON response confirming the assignment.
     */
    public function assignToRole(Permission $permission, Role $role): JsonResponse
    {
        $this->service->assignToRole($permission, $role);

        return response()->json(['message' => 'Permission assigned']);
    }

    /**
     * Removes a permission from a role and returns a confirmation message as JSON.
     *
     * @return JsonResponse JSON response with a confirmation message.
     */
    public function removeFromRole(Permission $permission, Role $role): JsonResponse
    {
        $this->service->removeFromRole($permission, $role);

        return response()->json(['message' => 'Permission removed']);
    }

    /**
     * Assigns the specified permission to a user.
     *
     * @param Permission $permission The permission to assign.
     * @param User $user The user to whom the permission will be assigned.
     * @return JsonResponse JSON response confirming the assignment.
     */
    public function assignToUser(Permission $permission, User $user): JsonResponse
    {
        $this->service->assignToUser($permission, $user);

        return response()->json(['message' => 'Permission assigned']);
    }

    /**
     * Removes a permission from a user and returns a confirmation message.
     *
     * @return JsonResponse JSON response with a confirmation message.
     */
    public function removeFromUser(Permission $permission, User $user): JsonResponse
    {
        $this->service->removeFromUser($permission, $user);

        return response()->json(['message' => 'Permission removed']);
    }
}
