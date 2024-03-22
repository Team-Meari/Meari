function Button({ usage, onClick, className, children }) {
  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      style={{ zIndex: 5 }}
    >
      {usage ? usage : children}
    </button>
  );
}

export default Button;
