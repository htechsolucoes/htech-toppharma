import React from 'react'

const userStatusToggle = ({
  user,
  toggle
}) => {
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
            background:user.color
          }}
        >

          {
            user.name
            .split(" ")
            .map(x=>x[0])
            .slice(0,2)
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
              {user.name}
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
            {user.role}
          </p>


        </div>


      </div>



      <div className="flex items-center gap-3">
        <span
          className={`
            text-sm
            font-semibold
            ${user.available ? "text-green-600" : "text-red-600"}
          `}
        >
          {
            user.available
            ?
            "Disponível"
            :
            "Indisponível"
          }
        </span>

        <button onClick={toggle}>
          <div
            className={`
            w-14
            h-8
            rounded-full
            p-1
            transition
            cursor-pointer
            ${
              user.available
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
                user.available
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

export default userStatusToggle
