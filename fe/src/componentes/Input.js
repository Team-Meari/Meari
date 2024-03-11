function Input({ type, name, value = "", placeholder, onChange, className }) {
  return (
    <input
      className={className}
      style={{ zIndex: 3 }}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
}

export default Input;
