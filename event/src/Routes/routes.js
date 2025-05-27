import { BrowserRouter, Route, Routes } from "react-router-dom";

import CadastroEvento from "../pages/cadastroEvento/cadastroEvento";
import CadastroTipoEvento from "../pages/cadastroTipoEvento/cadastroTipoEvento"
import CadastroTipoUsuario from "../pages/cadastroTipoUsuario/cadastroTipoUsuario"
import Login from "../pages/login/Login"
import ListagemEventos from "../pages/listagemDeEvento/ListagemDeEvento";

const Rotas = () => {
    return(
        <BrowserRouter >
        <Routes>
            <Route path="/" element={<Login />} exact/>
            <Route path="/ListaEvento" element={<ListagemEventos/>} />
            <Route path="/Evento" element={<CadastroEvento />} />
            <Route path="/TipoEvento" element={<CadastroTipoEvento />} />
            <Route path="/TipoUsuario" element={<CadastroTipoUsuario />} />



        </Routes>
        </BrowserRouter>
    )
}

export default Rotas;