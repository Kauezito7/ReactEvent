import './App.css';
import Login from "../src/pages/login/Login.jsx";
import Cadastro from "./components/cadastro/Cadastro.jsx";
import Footer from "./components/footer/Footer.jsx";
import CadastroEvento from "./pages/cadastroEvento/cadastroEvento.jsx";
import CadastroTipoEvento from "./pages/cadastroTipoEvento/cadastroTipoEvento.jsx";
import CadastroTipoUsuario from "./pages/cadastroTipoUsuario/cadastroTipoUsuario.jsx";
import Rotas from './Routes/routes.js';
import { AuthProvider } from './contexts/AuthContext.js';
import Chatbox from './components/chatbox/Chatbox.js';


function App() {
  return (
    <AuthProvider>
    <Rotas/>
    <Chatbox />
    </AuthProvider>
  );
}

export default App;
