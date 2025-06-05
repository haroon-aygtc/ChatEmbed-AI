<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Creates the `permission_user` pivot table to establish a many-to-many relationship between permissions and users.
     *
     * The table includes foreign keys to the `permissions` and `users` tables with cascading deletes, and uses a composite primary key on both columns.
     */
    public function up(): void
    {
        Schema::create('permission_user', function (Blueprint $table) {
            $table->foreignId('permission_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->primary(['permission_id', 'user_id']);
        });
    }

    /**
     * Drops the `permission_user` table if it exists, reversing the migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('permission_user');
    }
};
