import Downshift from 'downshift'
import { format, parseISO } from 'date-fns'
import { FiSearch, FiChevronUp, FiChevronDown, FiX, FiChevronsDown } from 'react-icons/fi'

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
        selectedItem,
        getToggleButtonProps,
        clearSelection
      }) => (
        <div className="">
          <div className="relative">
            <span className="absolute top-0 left-0 ml-4 text-white mt-3 pt-1">
              <FiSearch />
            </span>
            <input
              {...getInputProps({
                className: `block w-full bg-gray-900 placeholder-gray-500 text-white px-12  py-3 outline-none ${
                  !isOpen || noMatchFound({ inputValue }) ? 'rounded-full' : 'rounded-t-3xl'
                }`,
                placeholder: 'Type to select a star wars film...',
                defaultValue: undefined
              })}
            />
            <div className="absolute top-0 right-0 text-xl mr-4 mt-3">
              {selectedItem ? (
                <button
                  aria-label="Clear selection"
                  className="text-white"
                  onClick={clearSelection}
                >
                  <FiX />
                </button>
              ) : (
                <button
                  {...getToggleButtonProps({
                    className: 'text-white',
                    'aria-label': isOpen ? 'Close' : 'Open'
                  })}
                >
                  {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              )}
            </div>
          </div>
          <div className="relative">
            <ul
              {...getMenuProps({
                className:
                  'absolute top-0 left-0 w-full z-10 overflow-y-auto rounded-b-lg shadow-md divide-y divide-gray-800 bg-gray-900'
              })}
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
                        className={`cursor-pointer py-3 px-4 text-base flex flex-col hover:bg-gray-800`}
                        {...getItemProps({
                          key: index,
                          index,
                          item
                        })}
                      >
                        <p className="text-lg text-white">{item.title}</p>
                        <span className="text-base text-sw-yellow">
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
