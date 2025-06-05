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
    /****
     * Initializes the RoleController with a RoleService instance for handling role-related operations.
     */
    public function __construct(private RoleService $service)
    {
    }

    /**
     * Retrieves and returns a list of all roles as a JSON response.
     *
     * @return JsonResponse JSON array of all roles.
     */
    public function index(): JsonResponse
    {
        return response()->json($this->service->all());
    }

    /**
     * Creates a new role using validated request data and returns the created role as a JSON response.
     *
     * @param StoreRoleRequest $request The validated request containing role data.
     * @return JsonResponse The created role with HTTP status 201.
     */
    public function store(StoreRoleRequest $request): JsonResponse
    {
        $role = $this->service->create($request->validated());

        return response()->json($role, 201);
    }

    /****
     * Returns the specified role as a JSON response.
     *
     * @param Role $role The role to retrieve.
     * @return JsonResponse JSON representation of the specified role.
     */
    public function show(Role $role): JsonResponse
    {
        return response()->json($role);
    }

    /****
     * Updates the specified role with validated data and returns the updated role as a JSON response.
     *
     * @param UpdateRoleRequest $request The request containing validated role update data.
     * @param Role $role The role instance to update.
     * @return JsonResponse The updated role in JSON format.
     */
    public function update(UpdateRoleRequest $request, Role $role): JsonResponse
    {
        $role = $this->service->update($role, $request->validated());

        return response()->json($role);
    }

    /**
     * Deletes the specified role and returns a 204 No Content response.
     *
     * @param Role $role The role to be deleted.
     * @return JsonResponse HTTP response with no content on successful deletion.
     */
    public function destroy(Role $role): JsonResponse
    {
        $this->service->delete($role);

        return response()->noContent();
    }

    /****
     * Assigns a permission to the specified role.
     *
     * @param Role $role The role to which the permission will be assigned.
     * @param Permission $permission The permission to assign.
     * @return JsonResponse Confirmation message upon successful assignment.
     */
    public function assignPermission(Role $role, Permission $permission): JsonResponse
    {
        $this->service->assignPermission($role, $permission);

        return response()->json(['message' => 'Permission assigned']);
    }

    /**
     * Removes a permission from the specified role.
     *
     * @param Role $role The role from which the permission will be removed.
     * @param Permission $permission The permission to remove from the role.
     * @return JsonResponse JSON response confirming the removal.
     */
    public function removePermission(Role $role, Permission $permission): JsonResponse
    {
        $this->service->removePermission($role, $permission);

        return response()->json(['message' => 'Permission removed']);
    }

    /**
     * Assigns the specified role to a user.
     *
     * @param Role $role The role to assign.
     * @param User $user The user to whom the role will be assigned.
     * @return JsonResponse Confirmation message upon successful assignment.
     */
    public function assignToUser(Role $role, User $user): JsonResponse
    {
        $this->service->assignToUser($role, $user);

        return response()->json(['message' => 'Role assigned']);
    }

    /****
     * Removes a role from a user and returns a confirmation message as a JSON response.
     *
     * @param Role $role The role to be removed from the user.
     * @param User $user The user from whom the role will be removed.
     * @return JsonResponse JSON response confirming the removal.
     */
    public function removeFromUser(Role $role, User $user): JsonResponse
    {
        $this->service->removeFromUser($role, $user);

        return response()->json(['message' => 'Role removed']);
    }
}
