import * as React from 'react'
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table'
// import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
// import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'

const DefaultColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter } }) => {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      className="text-sm"
      onChange={(e) => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) => {
  const count = preGlobalFilteredRows && preGlobalFilteredRows.length

  return (
    <div className="relative flex items-center mb-2">
      {/* <FiSearch className="absolute top-0 left-0 mt-4 ml-3 text-lg text-gray-600" /> */}
      <input
        className="block w-full px-10 py-3 bg-white border rounded"
        value={globalFilter || ''}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined)
        }}
        placeholder={`Filter ${count} records...`}
      />
    </div>
  )
}

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

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
      defaultColumn,
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
                          // <FaSortUp />
                          <span>up</span>
                        ) : (
                          // <FaSortDown />
                          <span>down</span>
                        )
                      ) : (
                        // <FaSort />
                        <span>sort</span>
                      )}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          ))}
          {/* <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left'
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr> */}
        </thead>
        <tbody {...getTableBodyProps({ className: 'divide-y divide-gray-800' })}>
          {page.map((row, i) => {
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
        </tbody>
      </table>
    </section>
  )
}

// ;<div className="flex items-center justify-between w-full mx-auto mt-2 ml-2 text-nc-blue">
//   {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//           <FiChevronLeft /> <FiChevronLeft />
//         </button>{' '} */}
//   <div className="flex items-center">
//     <button
//       className="px-3 py-2 text-lg border rounded"
//       onClick={() => previousPage()}
//       disabled={!canPreviousPage}
//     >
//       {/* <FiChevronLeft /> */}
//       left
//     </button>{' '}
//     <button
//       className="px-3 py-2 text-lg border rounded"
//       onClick={() => nextPage()}
//       disabled={!canNextPage}
//     >
//       {/* <FiChevronRight /> */}
//       right
//     </button>{' '}
//   </div>
//   {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//           <FiChevronRight />
//           <FiChevronRight />
//         </button>{' '} */}
//   <div className="flex items-center text-sm">
//     <span className="hidden sm:flex">
//       Page{' '}
//       <strong className="mr-2">
//         {state.pageIndex + 1} of {pageOptions.length}
//       </strong>{' '}
//     </span>
//     <span className="flex items-center">
//       {' '}
//       <span className="hidden sm:flex">| Go to page: </span>
//       <input
//         type="number"
//         defaultValue={state.pageIndex + 1}
//         onChange={(e) => {
//           const page = e.target.value ? Number(e.target.value) - 1 : 0
//           gotoPage(page)
//         }}
//         className="w-20 py-2 text-center border rounded"
//       />
//     </span>{' '}
//   </div>

//   <select
//     value={state.pageSize}
//     onChange={(e) => {
//       setPageSize(Number(e.target.value))
//     }}
//     className="px-3 py-2 bg-white border rounded"
//   >
//     {[10, 20, 30, 40, 50].map((pageSize) => (
//       <option className="" key={pageSize} value={pageSize}>
//         Show {pageSize}
//       </option>
//     ))}
//   </select>
// </div>
