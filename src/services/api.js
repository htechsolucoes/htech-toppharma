const api = "/api";
const token = import.meta.env.VITE_API_TOKEN;
const id = import.meta.env.VITE_ID;

const currentUserMock = {
  id: 1,
  name: "Leandro Oliveira",
  role: "Administrador",
  available: true,
  since: "09:14",
  color: "#5B4FE9"
};

const usersMock = [
  {
    id: 2,
    name: "Rafael Duarte",
    role: "Atendente",
    available: true,
    since: "08:52",
    color: "#2E9D6B"
  },
  {
    id: 3,
    name: "Camila Torres",
    role: "Atendente",
    available: false,
    since: null,
    color: "#D96A9F"
  },
  {
    id: 4,
    name: "Thiago Almeida",
    role: "Atendente",
    available: true,
    since: "09:01",
    color: "#3E7BD6"
  }
];

async function request(path) {
  if (!api) {
    return null;
  }

  const response = await fetch(`${api}${path}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function normalizeUser(user) {
  const normalized = {
    name: user.name,
    profile: translateProfile(user.profile),
    available: user.availability,
    since: user.since || null,
    color: user.color || "#3E7BD6"
  };

  return normalized;
}


function translateProfile(profile) {
  const profiles = {
    ADMIN: "Administrador",
    AGENT: "Atendente",
    RESTRICTED_AGENT: "Atendente Restrito"
  };

  const translated = profiles[profile];

  return translated || profile;
}   

export async function fetchCurrentUser() {
  const data = await request(`/core/v1/agent/${id}`);

  if (!data) {
    return currentUserMock;
  }

  return normalizeUser(data);
}

export async function fetchUsers() {
  const data = await request("/core/v1/agent");

  if (!data) {
    return usersMock;
  }

  return Array.isArray(data)
    ? data.map(normalizeUser)
    : usersMock;
}

export { currentUserMock, usersMock };
