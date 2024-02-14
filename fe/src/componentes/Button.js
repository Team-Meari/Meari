function Button({ usage, onClick, className }) {
  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      style={{ margin: "10px" }}
    >
      {usage}
    </button>
  );
}

export default Button;
