<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Creates the 'roles' table with columns for id, name, description, is_system, and timestamps.
     *
     * The table includes an auto-incrementing primary key, a required name, an optional description, a boolean flag for system roles (defaulting to false), and created/updated timestamps.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->boolean('is_system')->default(false);
            $table->timestamps();
        });
    }

    /****
     * Drops the 'roles' table if it exists, reversing the migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
