import Downshift from 'downshift'
import { format, parseISO } from 'date-fns'

export function Dropdown({ items, onChange }) {
  const noMatchFound = ({ inputValue }) => {
    const _items = items.filter((item) =>
      item.title.toLowerCase().includes(String(inputValue).toLowerCase())
    )

    if (!_items.length) {
      return true
    }

    return false
  }

  return (
    <Downshift
      onChange={onChange}
      itemToString={(item) => item && item.title}
      initialIsOpen={false}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getToggleButtonProps,
        clearSelection
      }) => (
        <div className="">
          <div className="relative">
            <img
              className="absolute top-0 left-0 ml-4 mt-3 pt-1"
              src="/img/search.svg"
              alt="search"
            />
            <input
              {...getInputProps({
                className: `block w-full px-12 placeholder-gray-700 py-3 outline-none bg-white ${
                  !isOpen || noMatchFound({ inputValue }) ? 'rounded-full' : 'rounded-t-3xl'
                }`,
                placeholder: 'Search films...',
                defaultValue: undefined
              })}
            />
            <div className="absolute top-0 right-0 text-xl mr-4 mt-3 pt-1">
              {selectedItem ? (
                <button className="text-gray-700" onClick={clearSelection}>
                  <svg
                    aria-label="close"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              ) : (
                <button
                  {...getToggleButtonProps({
                    className: 'text-gray-700 '
                  })}
                >
                  {isOpen ? (
                    <svg
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  ) : (
                    <svg
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
          <div className="relative">
            <ul
              {...getMenuProps()}
              className="absolute top-0 left-0 w-full z-10 overflow-y-auto rounded-b-lg shadow-md divide-y divide-gray-300"
            >
              {isOpen
                ? items
                    .filter(
                      (item) =>
                        !String(inputValue).toLowerCase() ||
                        item.title.toLowerCase().includes(String(inputValue).toLowerCase())
                    )
                    .map((item, index) => (
                      <li
                        key={index}
                        className={`cursor-pointer py-3 px-4 text-base flex flex-col 
                            ${highlightedIndex === index ? ' bg-gray-100' : ' bg-white'}`}
                        {...getItemProps({
                          key: index,
                          index,
                          item
                        })}
                      >
                        <p className="text-lg text-gray-900">{item.title}</p>
                        <span className="text-base text-gray-600">
                          {format(parseISO(item.release_date), 'yyyy')} film
                        </span>
                      </li>
                    ))
                : null}
            </ul>
          </div>
        </div>
      )}
    </Downshift>
  )
}
