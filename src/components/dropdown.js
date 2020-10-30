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
        selectedItem,
        getToggleButtonProps,
        clearSelection
      }) => (
        <div className="">
          <div className="relative">
            <span className="absolute top-0 left-0 ml-4 text-white mt-3 pt-1">
              <svg
                width="15"
                className="fill-current stroke-current"
                height="15"
                viewBox="0 0 15 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.8985 8.87351H10.2662L10.0421 8.65739C10.8265 7.74487 11.2988 6.56019 11.2988 5.27145C11.2988 2.39781 8.96944 0.0684814 6.0958 0.0684814C3.22215 0.0684814 0.892822 2.39781 0.892822 5.27145C0.892822 8.1451 3.22215 10.4744 6.0958 10.4744C7.38453 10.4744 8.56921 10.0022 9.48173 9.21771L9.69785 9.44184V10.0742L13.7001 14.0685L14.8928 12.8758L10.8985 8.87351ZM6.0958 8.87351C4.10266 8.87351 2.49374 7.26459 2.49374 5.27145C2.49374 3.27832 4.10266 1.6694 6.0958 1.6694C8.08893 1.6694 9.69785 3.27832 9.69785 5.27145C9.69785 7.26459 8.08893 8.87351 6.0958 8.87351Z" />
              </svg>
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
                <button className="text-white" onClick={clearSelection}>
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
                    className: 'text-white'
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
              className="absolute top-0 left-0 w-full z-10 overflow-y-auto rounded-b-lg shadow-md divide-y divide-gray-800 bg-gray-900"
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
