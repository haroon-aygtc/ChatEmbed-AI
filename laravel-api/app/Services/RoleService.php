<?php

namespace App\Services;

use App\Models\Role;
use App\Models\Permission;
use App\Models\User;

class RoleService
{
    public function all()
    {
        return Role::all();
    }

    public function create(array $data): Role
    {
        return Role::create($data);
    }

    public function update(Role $role, array $data): Role
    {
        $role->update($data);

        return $role;
    }

    public function delete(Role $role): void
    {
        $role->delete();
    }

    public function assignPermission(Role $role, Permission $permission): void
    {
        $role->permissions()->syncWithoutDetaching($permission);
    }

    public function removePermission(Role $role, Permission $permission): void
    {
        $role->permissions()->detach($permission);
    }

    public function assignToUser(Role $role, User $user): void
    {
        $user->roles()->syncWithoutDetaching($role);
    }

    public function removeFromUser(Role $role, User $user): void
    {
        $user->roles()->detach($role);
    }
}
