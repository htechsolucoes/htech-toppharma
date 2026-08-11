import { useEffect, useState } from "react";

import Filters from "./components/filters";
import UserStatusToggle from "./components/userStatusToggle";
import UserCard from "./components/userCard";
import { fetchCurrentUser, fetchUsers, updateUserAvailability } from "./services/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadAgentsError, setloadAgentsError] = useState("");
  const [toggleError, setToggleError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [userData, usersData] = await Promise.all([
          fetchCurrentUser(),
          fetchUsers()
        ]);

        setCurrentUser(userData);
        setUsers(usersData);
      } catch (err) {
        setLoadError(err instanceof Error ? err.message : "Erro ao carregar dados");
        setCurrentUser(null);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const availableCount = users.filter(
    user => user.available === "AVAILABLE"
  ).length;

  const [search,setSearch] =
    useState("");

  const [filter,setFilter] =
    useState("disponivel");

async function toggleStatus() {
  if (!currentUser) {
    return;
  }

  const previousUser = currentUser;

  const newAvailability =
    currentUser.available === "AVAILABLE"
      ? "UNAVAILABLE"
      : "AVAILABLE";

  setToggleError("");

  // Atualiza a UI imediatamente
  setCurrentUser(prev => ({
    ...prev,
    available: newAvailability,
    since:
      newAvailability === "AVAILABLE"
        ? new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
          })
        : null
  }));

  try {
    // Faz a requisição depois da UI já ter mudado
    await updateUserAvailability(
      currentUser.userId,
      newAvailability
    );
  } catch (err) {
    console.error("Erro ao atualizar status:", err);

    // Se a API falhar, volta ao estado anterior
    setCurrentUser(previousUser);

    setToggleError(
      "Não foi possível atualizar o status. Tente novamente."
    );
  }
}

  const filteredUsers = users.filter(user => {
    // Não mostra o usuário atual na lista
    if (currentUser && user.id === currentUser.id) {
      return false;
    }

    const matchSearch =
      user.name
        .toLowerCase()
        .includes(search.toLowerCase())
      ||
      user.profile
        .toLowerCase()
        .includes(search.toLowerCase());

    if (!matchSearch)
      return false;

    if (filter === "disponivel")
      return user.available === "AVAILABLE";

    if (filter === "indisponivel")
      return user.available === "UNAVAILABLE";

    return true;
  });

  return (
    <main
      className="
      max-w-[1180px]
      mx-auto
      px-8
      py-8
      "
    >

      <div className="mb-4">
        <h1
          className="
          text-3xl
          font-extrabold
          text-slate-800
          "
        >
          Status da equipe
        </h1>

        <p
          className="
          text-sm
          text-gray-500
          "
        >
          {availableCount} de {users.length} colaboradores disponíveis agora
        </p>
      </div>

      <Filters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        />

      <UserStatusToggle
        user={currentUser}
        toggle={toggleStatus}
        loading={loading}
      />

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-8 text-center text-sm text-gray-600">
          Carregando dados...
        </div>
      ) : loadAgentsError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
          {loadAgentsError}
        </div>
      ) : (
        <div className="mt-5">
          <div className="flex w-full justify-between text-xs text-gray-500 font-semibold border-b border-gray-100 uppercase pb-2">
            <span>Colaborador</span>
            <span>Status</span>
          </div>
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}

    </main>
  );
}

export default App;