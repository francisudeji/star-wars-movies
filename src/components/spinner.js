export function Spinner() {
  return (
    <span className="w-full flex items-center justify-center text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        width="28"
        height="28"
        viewBox="0 0 128 128"
      >
        <g>
          <path
            d="M75.4 126.63a11.43 11.43 0 01-2.1-22.65 40.9 40.9 0 0030.5-30.6 11.4 11.4 0 1122.27 4.87h.02a63.77 63.77 0 01-47.8 48.05v-.02a11.38 11.38 0 01-2.93.37z"
            fill="#FFE81F"
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 64 64"
            to="360 64 64"
            dur="1000ms"
            repeatCount="indefinite"
          />
        </g>
      </svg>
    </span>
  )
}
