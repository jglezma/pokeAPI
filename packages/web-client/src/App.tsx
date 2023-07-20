import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PokemonPage } from "@/pages";
import { Provider } from "react-redux";
import { store } from "@/store/store";

function App() {
  return (
    <Provider store={store}>
      <PokemonPage />
      <ToastContainer />
    </Provider>
  );
}

export default App;
