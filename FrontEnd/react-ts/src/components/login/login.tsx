import { useState } from "react";
import {  authLogin } from "../../http/createAccout";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navLink = useNavigate();
const [cpfOrPassword, setCpfOrPassword] = useState("");
const [password, setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState("");

const handleSubmit = async () => {
setErrorMessage("");
if (!cpfOrPassword || !password) {
setErrorMessage("Preencha todos os campos.");
}
try {
  const login = await authLogin({ cpfOrPassword, password });
  console.log("Login efetuado:", login);
  navLink("/transactions");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
} catch (error: any) {
  if (error.response && error.response.data) {
    setErrorMessage(error.response.data.message || "Erro ao efetuar login.");
  } else {
    setErrorMessage(
      "Erro ao efetuar login. Verifique os dados e tente novamente."
    );
  }
}
};

return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()  
      }}
      className="flex flex-col space-y-4">
        <div>
          <label className="block mb-1 font-medium">CPF/CNPJ</label>
          <input
            type="text"
            value={cpfOrPassword}
            onChange={(e) => setCpfOrPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your CPF/CNPJ"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg"
        >
          Login
        </button>
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
      </form>
      <Link to="/createAccount" className="text-blue-500 text-center mt-4">
      <p>Create Account </p></Link>
      </div>
</div>
</div>

)
}