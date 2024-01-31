function Button({ usage, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {usage}
    </button>
  );
}

export default Button;
