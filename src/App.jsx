import { useEffect, useState } from "react";

import Filters from "./components/filters";
import UserStatusToggle from "./components/userStatusToggle";
import UserCard from "./components/userCard";
import {
  fetchCurrentUser,
  fetchUsers,
  currentUserMock,
  usersMock
} from "./services/api";

function App() {
  const [currentUser, setCurrentUser] = useState(currentUserMock);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError(err instanceof Error ? err.message : "Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);


  const availableCount = users.filter(
    user => user.available
  ).length;


  const [search,setSearch] =
    useState("");


  const [filter,setFilter] =
    useState("disponivel");



  function toggleStatus(){

    setCurrentUser(prev => ({
      ...prev,
      available: !prev.available,
      since:
        new Date()
        .toLocaleTimeString("pt-BR",{
          hour:"2-digit",
          minute:"2-digit"
        })
    }));

  }



  const filteredUsers = users.filter(user => {


    const matchSearch =
      user.name
      .toLowerCase()
      .includes(search.toLowerCase())
      ||
      user.role
      .toLowerCase()
      .includes(search.toLowerCase());


    if(!matchSearch)
      return false;


    if(filter==="disponivel")
      return user.available;


    if(filter==="indisponivel")
      return !user.available;


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
      />

      {loading ? (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-8 text-center text-sm text-gray-600">
          Carregando dados...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center text-sm text-red-700">
          {error}
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