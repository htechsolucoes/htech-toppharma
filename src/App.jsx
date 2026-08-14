import { useEffect, useState } from "react";

import Filters from "./components/filters";
import UserCard from "./components/userCard";
import { fetchUsers, updateUserAvailability } from "./services/api";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadAgentsError, setloadAgentsError] = useState("");
  const [toggleNotification, setToggleNotification] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        const usersData = await fetchUsers();

        setUsers(usersData);
      } catch (err) {
        setloadAgentsError(
          err instanceof Error
            ? err.message
            : "Erro ao carregar dados"
        );

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

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");

  async function toggleUserAvailability(user) {
    if (!user) {
      return;
    }

    const previousAvailability = user.available;

    const newAvailability =
      user.available === "AVAILABLE"
        ? "UNAVAILABLE"
        : "AVAILABLE";

    setUsers(prevUsers =>
      prevUsers.map(item =>
        item.id === user.id
          ? {
              ...item,
              available: newAvailability,
              since:
                newAvailability === "AVAILABLE"
                  ? new Date().toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })
                  : null
            }
          : item
      )
    );

    try {
      await updateUserAvailability(
        user.userId,
        newAvailability
      );

      setToggleNotification({
        type: "success",
        message: "Status atualizado com sucesso.",
        description:
          newAvailability === "AVAILABLE"
            ? "O colaborador está disponível agora."
            : "O colaborador está indisponível agora."
      });

      setTimeout(() => {
        setToggleNotification(null);
      }, 5000);

    } catch (err) {
      console.error("Erro ao atualizar status:", err);

      setUsers(prevUsers =>
        prevUsers.map(item =>
          item.id === user.id
            ? {
                ...item,
                available: previousAvailability,
                since: user.since || null
              }
            : item
        )
      );

      setToggleNotification({
        type: "error",
        message: "Não foi possível atualizar o status.",
        description: "Tente novamente em alguns instantes."
      });

      setTimeout(() => {
        setToggleNotification(null);
      }, 5000);
    }
  }

  const filteredUsers = users.filter(user => {
    const matchSearch =
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.profile
        .toLowerCase()
        .includes(search.toLowerCase());

    if (!matchSearch) {
      return false;
    }

    if (filter === "disponivel") {
      return user.available === "AVAILABLE";
    }

    if (filter === "indisponivel") {
      return user.available === "UNAVAILABLE";
    }

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

      {loading ? (
        <div
          className="
            rounded-xl
            border
            border-gray-200
            bg-white
            px-6
            py-8
            text-center
            text-sm
            text-gray-600
          "
        >
          Carregando dados...
        </div>
      ) : loadAgentsError ? (
        <div
          className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-6
            py-8
            text-center
            text-sm
            text-red-700
          "
        >
          {loadAgentsError}
        </div>
      ) : (
        <div className="mt-5">
          <div
            className="
              flex
              w-full
              justify-between
              text-xs
              font-semibold
              uppercase
              text-gray-500
              border-b
              border-gray-100
              pb-2
            "
          >
            <span>Colaborador</span>
            <span>Status</span>
          </div>

          {filteredUsers.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onToggle={() => toggleUserAvailability(user)}
            />
          ))}
        </div>
      )}

      {toggleNotification && (
        <div
          className={`
            fixed
            bottom-6
            right-6
            z-50
            w-[360px]
            overflow-hidden
            rounded-xl
            px-5
            py-4
            text-white
            shadow-xl
            ${
              toggleNotification.type === "success"
                ? "bg-green-500"
                : "bg-red-500"
            }
          `}
        >
          <div className="flex items-start gap-3">
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white/20
                text-sm
                font-bold
              "
            >
              {toggleNotification.type === "success" ? "✓" : "!"}
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold">
                {toggleNotification.message}
              </p>

              <p className="mt-1 text-xs text-white/80">
                {toggleNotification.description}
              </p>
            </div>
          </div>

          <div
            className="
              absolute
              bottom-0
              left-0
              h-1
              w-full
              origin-left
              animate-[shrink_5s_linear_forwards]
              bg-white/40
            "
          />
        </div>
      )}
    </main>
  );
}

export default App;