// dev
/* const api = import.meta.env.PROD ? import.meta.env.VITE_API_URL : "";
const token = import.meta.env.VITE_API_TOKEN;
const id = import.meta.env.VITE_ID; */

const id = import.meta.env.VITE_ID;

async function request(path) {
  const response = await fetch(`/api${path}`, {
    headers: {
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const bodyText = await response.clone().text().catch(() => "");

    throw new Error(
      `API request failed: ${response.status} ${response.statusText} - ${bodyText}`
    );
  }

  return response.json();
}

function normalizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    profile: translateProfile(user.profile || user.role),
    available: user.available ?? user.availability,
    since: user.since || null,
    color: user.color || "#3E7BD6"
  };
}

function translateProfile(profile) {
  const profiles = {
    ADMIN: "Administrador",
    AGENT: "Atendente",
    RESTRICTED_AGENT: "Atendente Restrito"
  };

  return profiles[profile] || profile || "";
}

export async function fetchCurrentUser() {
  const data = await request(`/core/v1/agent/${id}`);
  return normalizeUser(data);
}

export async function fetchUsers() {
  const data = await request("/core/v1/agent");

  if (!Array.isArray(data)) {
    throw new Error("Resposta de usuários inválida");
  }

  return data.map(normalizeUser);
}