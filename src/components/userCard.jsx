import React from 'react'

const userCard = ({ user }) => {
  return (

    <div
      className="
      flex
      items-center
      justify-between
      py-5
      border-b
      border-gray-100
      "
    >


      <div
        className="
        flex
        items-center
        gap-4
        "
      >


        <div
          className="
          w-12
          h-12
          rounded-full
          flex
          items-center
          justify-center
          text-white
          font-bold
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

          <h3
            className="
            font-semibold
            text-gray-900
            "
          >
            {user.name}
          </h3>


          <p
            className="
            text-sm
            text-gray-500
            "
          >
            {user.role}
          </p>


        </div>


      </div>




      <div
        className="
        flex
        items-center
        gap-4
        "
      >


        {
          user.available &&
          <span
            className="
            text-sm
            text-gray-400
            "
          >
            desde {user.since}
          </span>
        }



        <span
          className={`
          flex
          items-center
          gap-2
          px-3
          py-1.5
          rounded-full
          text-sm
          font-medium

          ${
            user.available
            ?
            "bg-green-50 text-green-700"
            :
            "bg-gray-100 text-gray-600"
          }
          `}
        >

          <span
            className="
            w-2
            h-2
            rounded-full
            bg-current
            "
          />

          {
            user.available
            ?
            "Disponível"
            :
            "Indisponível"
          }


        </span>


      </div>


    </div>

  )

}

export default userCard
