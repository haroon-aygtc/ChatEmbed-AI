<?php

namespace App\Services;

use App\Models\Role;
use App\Models\Permission;
use App\Models\User;

class RoleService
{
    /**
     * Retrieves all roles.
     *
     * @return \Illuminate\Database\Eloquent\Collection|\App\Models\Role[] List of all Role records.
     */
    public function all()
    {
        return Role::all();
    }

    /****
     * Creates a new Role with the specified data.
     *
     * @param array $data Attributes for the new Role.
     * @return Role The created Role instance.
     */
    public function create(array $data): Role
    {
        return Role::create($data);
    }

    /****
     * Updates the specified role with the provided data.
     *
     * @param Role $role The role instance to update.
     * @param array $data The data to update the role with.
     * @return Role The updated role instance.
     */
    public function update(Role $role, array $data): Role
    {
        $role->update($data);

        return $role;
    }

    /**
     * Deletes the specified role from the database.
     *
     * @param Role $role The role instance to be deleted.
     */
    public function delete(Role $role): void
    {
        $role->delete();
    }

    /****
     * Assigns a permission to a role without removing existing permissions.
     *
     * If the permission is already assigned, no changes are made.
     */
    public function assignPermission(Role $role, Permission $permission): void
    {
        $role->permissions()->syncWithoutDetaching($permission);
    }

    /**
     * Removes the association between a permission and a role.
     *
     * After calling this method, the specified permission will no longer be assigned to the given role.
     */
    public function removePermission(Role $role, Permission $permission): void
    {
        $role->permissions()->detach($permission);
    }

    /****
     * Assigns the specified role to the user without removing any existing roles.
     */
    public function assignToUser(Role $role, User $user): void
    {
        $user->roles()->syncWithoutDetaching($role);
    }

    /****
     * Removes the association between the specified role and user.
     *
     * After calling this method, the user will no longer have the given role.
     */
    public function removeFromUser(Role $role, User $user): void
    {
        $user->roles()->detach($role);
    }
}
