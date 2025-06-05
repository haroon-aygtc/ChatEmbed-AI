<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePermissionRequest extends FormRequest
{
    /****
     * Determines if the user is authorized to make this request.
     *
     * @return bool Always returns true, allowing all users to proceed.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Returns the validation rules for updating a permission.
     *
     * Specifies optional fields for the request, including constraints for name, description, category, and is_system.
     *
     * @return array Validation rules for the permission update request.
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'category' => ['sometimes', 'nullable', 'string'],
            'is_system' => ['sometimes', 'boolean'],
        ];
    }
}
