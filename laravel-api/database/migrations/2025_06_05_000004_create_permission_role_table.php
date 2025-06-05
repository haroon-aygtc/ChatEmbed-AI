<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Creates the `permission_role` pivot table to establish a many-to-many relationship between permissions and roles.
     *
     * The table includes `permission_id` and `role_id` as foreign keys with cascading deletes, and uses their combination as the composite primary key.
     */
    public function up(): void
    {
        Schema::create('permission_role', function (Blueprint $table) {
            $table->foreignId('permission_id')->constrained()->cascadeOnDelete();
            $table->foreignId('role_id')->constrained()->cascadeOnDelete();
            $table->primary(['permission_id', 'role_id']);
        });
    }

    /**
     * Drops the `permission_role` table if it exists, reversing the migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('permission_role');
    }
};
