<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePermissionRequest extends FormRequest
{
    /**
     * Determines if the user is authorized to make this request.
     *
     * Always returns true, allowing any user to submit the request.
     *
     * @return bool True if the request is authorized.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Returns the validation rules for storing a permission.
     *
     * @return array Validation rules for the request data.
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category' => ['nullable', 'string'],
            'is_system' => ['boolean'],
        ];
    }
}
