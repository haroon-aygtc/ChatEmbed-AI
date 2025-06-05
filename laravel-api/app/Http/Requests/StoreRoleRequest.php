<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreRoleRequest extends FormRequest
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

    /****
     * Returns the validation rules for storing a role.
     *
     * @return array Validation rules for the request data, including requirements for 'name', 'description', and 'is_system' fields.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'is_system' => ['boolean'],
        ];
    }
}
