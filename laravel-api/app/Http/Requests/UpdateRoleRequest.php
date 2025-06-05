<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRoleRequest extends FormRequest
{
    /**
     * Determines if the user is authorized to make this request.
     *
     * Always returns true, allowing any user to perform the update role request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Returns the validation rules for updating a role.
     *
     * Applies conditional validation to the 'name', 'description', and 'is_system' fields, allowing partial updates with appropriate constraints.
     *
     * @return array Validation rules for the request data.
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['sometimes', 'nullable', 'string'],
            'is_system' => ['sometimes', 'boolean'],
        ];
    }
}
