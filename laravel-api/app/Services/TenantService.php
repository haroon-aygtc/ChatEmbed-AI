<?php

namespace App\Services;

use App\Models\Tenant;

class TenantService
{
    /**
     * Get all tenants.
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, Tenant>
     */
    public function all()
    {
        return Tenant::all();
    }

    /**
     * Create a tenant.
     */
    public function create(array $data): Tenant
    {
        return Tenant::create($data);
    }

    /**
     * Update a tenant.
     */
    public function update(Tenant $tenant, array $data): Tenant
    {
        $tenant->update($data);

        return $tenant;
    }

    /**
     * Delete a tenant.
     */
    public function delete(Tenant $tenant): void
    {
        $tenant->delete();
    }
}
