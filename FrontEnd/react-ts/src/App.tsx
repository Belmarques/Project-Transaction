import CreateAccount from "./components/createAccout/createAccout";
import { Login } from "./components/login/login";
import { Route, Routes } from "react-router-dom";
import Transactions from "./pages/transactions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/transactions" element={<Transactions />} />
    </Routes>
  );
}

export default App;
