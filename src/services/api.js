async function request(path) {
  const response = await fetch(`/api${path}`, {
    headers: {
      Accept: "application/json"
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
    userId: user.userId,
    name: user.name,
    profile: translateProfile(user.profile || user.role),
    available: user.available || user.availability,
    isOwner: user.isOwner === true,
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
  const id = "176c241f-56b4-42f8-b992-df71c24d6298";

  const data = await request(`/agent/${id}`);

  return normalizeUser(data);
}

export async function fetchUsers() {
  const data = await request("/agent");

  if (!Array.isArray(data)) {
    throw new Error("Resposta de usuários inválida");
  }

  return data.map(normalizeUser);
}

export async function updateUserAvailability(userId, availability) {
  const response = await fetch(`/api/agent/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      availability
    })
  });

  if (!response.ok) {
    const bodyText = await response.clone().text().catch(() => "");

    throw new Error(
      `API request failed: ${response.status} ${response.statusText} - ${bodyText}`
    );
  }

  return response.json().catch(() => ({}));
}