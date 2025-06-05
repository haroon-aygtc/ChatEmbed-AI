const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function getCsrfCookie() {
  await fetch(`${API_BASE}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
}

interface ErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

async function request(
  url: string,
  options: RequestInit = {},
): Promise<any> {
  const res = await fetch(url, { ...options, credentials: "include" });
  if (!res.ok) {
    let data: ErrorResponse | undefined;
    try {
      data = await res.json();
    } catch (e) {
      // ignore json parse error
    }
    throw data || { message: res.statusText };
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function login(data: { email: string; password: string }) {
  await getCsrfCookie();
  return request(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function register(data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  await getCsrfCookie();
  return request(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function logout() {
  await getCsrfCookie();
  return request(`${API_BASE}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}

export async function getUsers() {
  return request(`${API_BASE}/users`);
}

export async function createUser(data: Record<string, any>) {
  await getCsrfCookie();
  return request(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateUser(id: number | string, data: Record<string, any>) {
  await getCsrfCookie();
  return request(`${API_BASE}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id: number | string) {
  await getCsrfCookie();
  return request(`${API_BASE}/users/${id}`, {
    method: "DELETE",
  });
}

export async function getRoles() {
  return request(`${API_BASE}/roles`);
}

export async function createRole(data: Record<string, any>) {
  await getCsrfCookie();
  return request(`${API_BASE}/roles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updateRole(id: number | string, data: Record<string, any>) {
  await getCsrfCookie();
  return request(`${API_BASE}/roles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteRole(id: number | string) {
  await getCsrfCookie();
  return request(`${API_BASE}/roles/${id}`, {
    method: "DELETE",
  });
}

export async function getPermissions() {
  return request(`${API_BASE}/permissions`);
}

export async function createPermission(data: Record<string, any>) {
  await getCsrfCookie();
  return request(`${API_BASE}/permissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function updatePermission(id: number | string, data: Record<string, any>) {
  await getCsrfCookie();
  return request(`${API_BASE}/permissions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deletePermission(id: number | string) {
  await getCsrfCookie();
  return request(`${API_BASE}/permissions/${id}`, {
    method: "DELETE",
  });
}

