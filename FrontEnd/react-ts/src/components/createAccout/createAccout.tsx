import { useState } from "react";
import { createAccout } from "../../http/createAccout";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpfOrCnpj, setCpfOrCnpj] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Alternar visibilidade da senha
  const toggleShowPassword = () => setShowPassword(!showPassword);

  // Função para lidar com a submissão do formulário
  const handleSubmit = async () => {
    setErrorMessage("");

    // Verifica se CPF ou CNPJ está no formato correto
  
    if (!cpfOrCnpj ) {
      setErrorMessage("Preencha o campo com um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.");
      return;
    }

    try {
      const response = await createAccout({ name, email, password, cpfOrCnpj });
      console.log("Conta criada:", response);
      navigate("/");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Erro ao criar conta.");
      } else {
        setErrorMessage("Erro ao criar conta. Verifique os dados e tente novamente.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-4 top-12 transform -translate-y-1/2 "
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </button>
          </div>
          <div>
            <label className="block mb-1 font-medium">CPF or CNPJ</label>
            <input
              type="text"
              value={cpfOrCnpj}
              onChange={(e) => setCpfOrCnpj(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter CPF (11 digits) or CNPJ (14 digits)"
              required
            />
          </div>

          {/* Exibição da mensagem de erro */}
          {errorMessage && (
            <div className="bg-red-100 text-red-700 p-2 rounded-lg">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
