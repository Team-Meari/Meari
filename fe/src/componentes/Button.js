function Button({ usage, onClick, className, children }) {
  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      style={{ margin: "10px", zIndex: 5 }}
    >
      {usage ? usage : children}
    </button>
  );
}

export default Button;
