import { useCallback } from "react";
import Button from "./componentes/Button";
import { Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <h1>Hi This is Meari!!</h1>
      <Link to="/login">
        <Button usage={"로그인"} />
      </Link>
    </div>
  );
}

export default App;
