<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Creates the `permissions` table with columns for name, description, category, system flag, and timestamps.
     *
     * Defines the schema for storing permission records, including metadata and categorization.
     */
    public function up(): void
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('category')->nullable();
            $table->boolean('is_system')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Drops the `permissions` table if it exists, reversing the migration.
     */
    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
