import * as React from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { getTotalHeightInUnit } from '@/utils/height'
export function TableLayout({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true
        })
      }
    }),
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, page } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 100 },
      filterTypes
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  return (
    <section className="mt-6 rounded-lg overflow-hidden">
      <table {...getTableProps({ className: 'w-full' })}>
        <thead className="bg-gray-900 text-sw-yellow">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="p-4 font-bold text-left"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <span className="flex items-center w-full text-xs tracking-wide uppercase">
                    {column.render('Header')}
                    <span className="ml-3">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FaSortUp />
                        ) : (
                          <FaSortDown />
                        )
                      ) : (
                        <FaSort />
                      )}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps({ className: 'divide-y divide-gray-800' })}>
          {page.map((row) => {
            prepareRow(row)
            return (
              <tr className="bg-gray-900 text-white hover:bg-gray-800" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td className="p-4 text-sm" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
          <tr className="bg-gray-900 text-white hover:bg-gray-800 font-semibold">
            <td className="p-4 text-sm">{/* {cell.render('Cell')} */}</td>
            <td className="p-4 text-sm space-x-0 sm:space-x-1 flex flex-col sm:flex-row sm:items-center">
              <span>{getTotalHeightInUnit({ rows: page })}cm</span>
              <div>
                <span className="">({getTotalHeightInUnit({ unit: 'foot', rows: page })}ft/</span>
                <span>{getTotalHeightInUnit({ unit: 'inches', rows: page })}in)</span>
              </div>
            </td>
            <td className="p-4 text-sm">{page.length}</td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}
