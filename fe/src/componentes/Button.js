function Button({ usage, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{ margin: "10px" }}>
      {usage}
    </button>
  );
}

export default Button;
