import AppRouter from "./router/AppRouter.tsx";
import Header from "./components/Header.tsx";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  );
}

export default App;
