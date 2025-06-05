<?php

namespace App\Services;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;

class PermissionService
{
    /**
     * Retrieves all Permission records.
     *
     * @return \Illuminate\Database\Eloquent\Collection Collection of all Permission instances.
     */
    public function all()
    {
        return Permission::all();
    }

    /**
     * Creates a new permission using the provided data.
     *
     * @param array $data Attributes for the new permission.
     * @return Permission The created permission instance.
     */
    public function create(array $data): Permission
    {
        return Permission::create($data);
    }

    /**
     * Updates the specified Permission with the provided data.
     *
     * @param Permission $permission The Permission instance to update.
     * @param array $data The data to update the Permission with.
     * @return Permission The updated Permission instance.
     */
    public function update(Permission $permission, array $data): Permission
    {
        $permission->update($data);

        return $permission;
    }

    /**
     * Deletes the specified permission from the database.
     *
     * @param Permission $permission The permission instance to be deleted.
     */
    public function delete(Permission $permission): void
    {
        $permission->delete();
    }

    /****
     * Assigns a permission to a role without removing existing permissions.
     *
     * Associates the specified permission with the given role, preserving any previously assigned permissions.
     */
    public function assignToRole(Permission $permission, Role $role): void
    {
        $role->permissions()->syncWithoutDetaching($permission);
    }

    /****
     * Removes the association between the specified permission and role.
     *
     * @param Permission $permission The permission to be removed from the role.
     * @param Role $role The role from which the permission will be removed.
     */
    public function removeFromRole(Permission $permission, Role $role): void
    {
        $role->permissions()->detach($permission);
    }

    /****
     * Assigns a permission to a user without removing existing permissions.
     *
     * Associates the specified Permission with the given User, preserving any previously assigned permissions.
     */
    public function assignToUser(Permission $permission, User $user): void
    {
        $user->permissions()->syncWithoutDetaching($permission);
    }

    /****
     * Removes the association between the specified permission and user.
     *
     * @param Permission $permission The permission to be removed from the user.
     * @param User $user The user from whom the permission will be removed.
     */
    public function removeFromUser(Permission $permission, User $user): void
    {
        $user->permissions()->detach($permission);
    }
}
