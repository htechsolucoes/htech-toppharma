import React from 'react'

const UserStatusToggle = ({
  user,
  toggle,
  loading = false
}) => {
  const userInfo = user || {};
  const hasUser = Boolean(userInfo.name);
  const displayName = hasUser ? userInfo.name : "Usuário não encontrado";
  const displayProfile = hasUser ? (userInfo.profile || userInfo.role || "") : "";
  const isAvailable = userInfo.available === "AVAILABLE";
  const canToggle = hasUser && typeof toggle === "function";

  if (loading) {
    return (
      <div
        className="
        flex
        items-center
        justify-between
        border
        border-gray-200
        rounded-xl
        px-4
        py-4
        mb-7
        bg-[#F8F9FC]
        animate-pulse
        "
      >
        <div className="flex items-center gap-4">
          <div className="w-10.5 h-10.5 rounded-full bg-gray-200" />
          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="w-14 h-8 rounded-full bg-gray-200" />
        </div>
      </div>
    );
  }

  return (

    <div
      className="
      flex
      items-center
      justify-between
      border
      border-gray-200
      rounded-xl
      px-4
      py-4
      mb-7
      bg-[#F8F9FC]
      "
    >
      <div className="flex items-center gap-4">

        <div
          className="
          w-10.5
          h-10.5
          rounded-full
          flex
          items-center
          justify-center
          text-white
          font-semibold
          "
          style={{
            background: hasUser ? userInfo.color : "#9CA3AF"
          }}
        >

          {
            displayName
            .split(" ")
            .map(x => x[0])
            .slice(0, 2)
            .join("")
          }

        </div>

        <div>
          <div className="flex items-center gap-2">
            <h2 className="
            text-base
            font-semibold
            text-gray-900
            ">
              {displayName}
            </h2>


            <span
              className="
              text-xs
              bg-indigo-50
              text-indigo-600
              px-2
              py-1
              rounded-full
              "
            >
              Você
            </span>


          </div>


          <p className="text-sm text-gray-500">
            {displayProfile}
          </p>


        </div>


      </div>



      <div className="flex items-center gap-3">
        <span
          className={`
            text-sm
            font-semibold
            ${isAvailable ? "text-green-600" : "text-red-600"}
          `}
        >
          {
            isAvailable
            ?
            "Disponível"
            :
            "Indisponível"
          }
        </span>

        <button
          onClick={canToggle ? toggle : undefined}
          className={canToggle ? "" : "cursor-not-allowed"}
        >
          <div
            className={`
            w-14
            h-8
            rounded-full
            p-1
            transition
            ${canToggle ? "cursor-pointer" : "bg-gray-200"}
            ${
              isAvailable
              ?
              "bg-indigo-600"
              :
              "bg-gray-300"
            }
            `}
          >

            <div
              className={`
              w-6
              h-6
              bg-white
              rounded-full
              transition-transform

              ${
                isAvailable
                ?
                "translate-x-6"
                :
                "translate-x-0"
              }
              `}
            />
          </div>
        </button>
      </div>
    </div>

  )
}

export default UserStatusToggle