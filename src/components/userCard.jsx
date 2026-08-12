import React from "react";

const UserCard = ({ user, canEdit = false, onToggle }) => {
  const isAvailable = user.available === "AVAILABLE";

  return (
    <div
      className="
      flex
      items-center
      justify-between
      py-3
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
          w-10.5
          h-10.5
          rounded-full
          flex
          items-center
          justify-center
          text-white
          font-bold
          "
          style={{
            background: user.color
          }}
        >
          {user.name
            .split(" ")
            .map(x => x[0])
            .slice(0, 2)
            .join("")}
        </div>

        <div>
          <h3
            className="
            text-sm
            font-semibold
            text-gray-900
            "
          >
            {user.name}
          </h3>

          <p
            className="
            text-[12.5px]
            text-gray-500
            "
          >
            {user.profile}
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
        {isAvailable && (
          <span
            className="
            text-sm
            text-gray-400
            "
          >
            desde 09:04
          </span>
        )}

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
            isAvailable
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
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

          {isAvailable
            ? "Disponível"
            : "Indisponível"}
        </span>

        {canEdit && (
          <button
            type="button"
            onClick={onToggle}
            className="cursor-pointer"
          >
            <div
              className={`
              w-14
              h-8
              rounded-full
              p-1
              transition
              ${
                isAvailable
                  ? "bg-indigo-600"
                  : "bg-gray-300"
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
                    ? "translate-x-6"
                    : "translate-x-0"
                }
                `}
              />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;