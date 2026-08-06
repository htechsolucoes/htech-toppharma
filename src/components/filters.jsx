import React from 'react'

const Filters = ({
  search,
  setSearch,
  filter,
  setFilter
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-[22px]">

      <div className="relative flex-1 min-w-[220px]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="
            absolute
            left-[13px]
            top-1/2
            -translate-y-1/2
            w-4
            h-4
            text-gray-400
            pointer-events-none
          "
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Pesquisar colaborador"
          className="
            w-full
            py-[10px]
            pl-[38px]
            pr-[14px]
            border
            border-gray-200
            rounded-[9px]
            bg-white
            text-[13.5px]
            text-[#1D2433]
            placeholder:text-gray-400
            outline-none
            focus:border-indigo-500
          "
        />
      </div>

      <div className="relative min-w-[220px]">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="
            appearance-none
            w-full
            py-[10px]
            pl-[14px]
            pr-[34px]
            border
            border-gray-200
            rounded-[9px]
            bg-white
            text-[13.5px]
            text-[#1D2433]
            outline-none
            cursor-pointer
            focus:border-indigo-500
          "
        >
          <option value="disponivel">
            Status: Disponíveis
          </option>

          <option value="indisponivel">
            Status: Indisponíveis
          </option>

          <option value="todos">
            Status: Todos
          </option>
        </select>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="
            absolute
            right-[10px]
            top-1/2
            -translate-y-1/2
            w-4
            h-4
            text-gray-500
            pointer-events-none
          "
        >
          <polyline
            points="6 9 12 15 18 9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

    </div>
  )
}

export default Filters