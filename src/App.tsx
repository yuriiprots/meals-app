import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/app-router";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
