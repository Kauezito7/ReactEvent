import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import CadastroEvento from "../pages/cadastroEvento/cadastroEvento";
import CadastroTipoEvento from "../pages/cadastroTipoEvento/cadastroTipoEvento"
import CadastroTipoUsuario from "../pages/cadastroTipoUsuario/cadastroTipoUsuario"
import Login from "../pages/login/Login"
import ListagemEventos from "../pages/listagemDeEvento/ListagemDeEvento";
import { useAuth } from "../contexts/AuthContext";
import TelaHome from "../pages/telaHome/telaHome"

const Privado = (props) => {
    const {usuario} = useAuth();
    //tke, idUsuario, tipoUsuario

    // Se nao estiver authenticado, mada para login

    console.log(usuario);
    console.log(usuario.tipoUsuario);
    
    if (!usuario) {
       return <Navigate to="/" />; 
    }

    // Se o tipo do usuario nao for o permitido, bloqueia
    if(usuario.tipoUsuario !== props.tipoPermitido) {
    // ir para a tela de nao encontrado!
    return <Navigate to="/" />;
    }

    // Senao, renderiza o componente passado
    return <props.item />;
}


const Rotas = () => {
    return(
        <BrowserRouter >
        <Routes>
            <Route path="/" element={<Login />} exact/>
            <Route path="/ListaEvento" element={<Privado tipoPermitido="Comum" item={ListagemEventos} />} />
            <Route path="/Evento" element={< Privado tipoPermitido="Admin" item={CadastroEvento}  />} />
            <Route path="/TipoEvento" element={<Privado tipoPermitido="Admin" item={CadastroTipoEvento} />} />
            <Route path="/TipoUsuario" element={<Privado tipoPermitido="Admin" item={CadastroTipoUsuario}  />} />
              <Route element = {<TelaHome/>} path = "/telahome"  />



        </Routes>
        </BrowserRouter>
    )
}

export default Rotas;