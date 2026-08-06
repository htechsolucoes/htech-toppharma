import { useState } from "react";

import Filters from "./components/filters";
import UserStatusToggle from "./components/userStatusToggle";
import UserCard from "./components/userCard";


const currentUserMock = {
  id:1,
  name:"Leandro Oliveira",
  role:"Administrador",
  available:true,
  since:"09:14",
  color:"#5B4FE9"
}


const usersMock = [
  {
    id:2,
    name:"Rafael Duarte",
    role:"Atendente",
    available:true,
    since:"08:52",
    color:"#2E9D6B"
  },
  {
    id:3,
    name:"Camila Torres",
    role:"Atendente",
    available:false,
    since:null,
    color:"#D96A9F"
  },
  {
    id:4,
    name:"Thiago Almeida",
    role:"Atendente",
    available:true,
    since:"09:01",
    color:"#3E7BD6"
  }
]


function App() {
  const [currentUser,setCurrentUser] =
    useState(currentUserMock);


  const [users] =
    useState(usersMock);


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

      <div className="mt-5">
        <div class="flex w-full justify-between text-xs text-gray-500 font-semibold border-b border-gray-100 uppercase pb-2">
          <span>Colaborador</span>
          <span>Status</span>
        </div>
        {filteredUsers.map(user => (
          <UserCard
            key={user.id}
            user={user}
          />
        ))}


      </div>

    </main>
  )
}

export default App;