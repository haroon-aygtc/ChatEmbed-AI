<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Creates the `role_user` pivot table to establish a many-to-many relationship between roles and users.
     *
     * The table includes `role_id` and `user_id` as foreign keys with cascading deletes, and sets a composite primary key on both columns.
     */
    public function up(): void
    {
        Schema::create('role_user', function (Blueprint $table) {
            $table->foreignId('role_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->primary(['role_id', 'user_id']);
        });
    }

    /**
     * Drops the `role_user` pivot table if it exists.
     *
     * This method reverses the migration by removing the table that establishes the many-to-many relationship between roles and users.
     */
    public function down(): void
    {
        Schema::dropIfExists('role_user');
    }
};
