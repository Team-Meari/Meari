function Input({ type, name, value = "", placeholder, onChange }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  );
}

export default Input;
