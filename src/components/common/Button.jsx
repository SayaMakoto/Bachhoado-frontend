export default function Button({ children, className = "", ...rest }) {
  return (
    <button
      className={`w-full bg-green-500 p-3 rounded-lg hover:bg-green-600 transition ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
