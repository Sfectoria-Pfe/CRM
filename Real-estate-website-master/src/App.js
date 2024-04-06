import "./App.css";
import Pages from "./components/pages/Pages";
import { Provider } from "react-redux";
import { store } from "./components/store/store";

function App() {
  return (
    <Provider store={store}>
      <Pages />
    </Provider>
  );
}

export default App;
