export default function Input({ value, onChange, className = "", ...rest }) {
  return (
    <input
      value={value}
      onChange={onChange}
      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`}
      {...rest}
    />
  );
}
