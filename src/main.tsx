import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
// import AppRouter from "@routes/AppRouter";
import AppRouter from "@routes/AppRouter";
import "@styles/global.css";

// redux persist
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/index";

// axios
import "@services/axiosConfig.js";

// redux
import { Provider } from "react-redux";
import { store } from "@store/index";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
