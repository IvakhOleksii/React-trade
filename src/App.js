import useInterceptors from "./hooks/useInterceptors";
import Router from "./Router";
import "./App.css";

function App() {
  useInterceptors();

  return <Router />;
}

export default App;
