export function RadioGroup({ children, ...props }) {
  return (
    <div className="flex items-center justify-between space-x-10 sm:justify-start" {...props}>
      {children}
    </div>
  )
}

export function RadioButton({ value, id, onChange, checked, label }) {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <input
        type="radio"
        className="hidden"
        value={value}
        id={id}
        onChange={onChange}
        checked={checked}
      />

      {!checked ? (
        <span className="w-4 h-4 bg-white border border-gray-500 rounded-full"></span>
      ) : (
        <span className="flex items-center justify-center w-4 h-4 border rounded-full border-nc-blue">
          <span className="w-3 h-3 rounded-full bg-sw-yellow"></span>
        </span>
      )}
      <span className="ml-3 text-sm text-white">{label}</span>
    </label>
  )
}
