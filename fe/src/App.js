import { useState, useCallback } from "react";
import Button from "./componentes/Button";
import LogModal from "./routes/Login";

function App() {
  return (
    <div className="App">
      <h1>Hi This is Meari!!</h1>
      <LogModal />
    </div>
  );
}

export default App;
