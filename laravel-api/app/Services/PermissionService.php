<?php

namespace App\Services;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;

class PermissionService
{
    public function all()
    {
        return Permission::all();
    }

    public function create(array $data): Permission
    {
        return Permission::create($data);
    }

    public function update(Permission $permission, array $data): Permission
    {
        $permission->update($data);

        return $permission;
    }

    public function delete(Permission $permission): void
    {
        $permission->delete();
    }

    public function assignToRole(Permission $permission, Role $role): void
    {
        $role->permissions()->syncWithoutDetaching($permission);
    }

    public function removeFromRole(Permission $permission, Role $role): void
    {
        $role->permissions()->detach($permission);
    }

    public function assignToUser(Permission $permission, User $user): void
    {
        $user->permissions()->syncWithoutDetaching($permission);
    }

    public function removeFromUser(Permission $permission, User $user): void
    {
        $user->permissions()->detach($permission);
    }
}
