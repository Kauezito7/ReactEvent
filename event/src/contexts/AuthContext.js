// Importa funcoes do React necessarias para criar e use contexto
import { createContext, useState, useContext } from "react";

// Cria o contexto de autenticacao, que vai permitir compartilhar dados entre componentes
const AuthContext = createContext();

// Esse componente vai envolver a aplicacao (ou parte dela) e fornecer os dados de authenticacao para os filhos
// Provider = prover/dar
export const AuthProvider = ({ children}) => {
    // Cria um estado que guarda os dados do ususario logado
    const [usuario, setUsuario] = useState(null);

    return(
        // O Athcontext.Provider permite que qualquer componente dentro dele acesse o `usuario` e `setUsuario`
        // Faz com que qualquer componente que esteja dentro e <AuthProvider> consiga acessar o valor { usuario, setUsuario } usando o hook useAuth().
        <AuthContext.Provider value={{ usuario, setUsuario}}>
            {children}
        </AuthContext.Provider>
    );
};

// Esse hook personalizado facilita o acesso ao contexto dentro de qualquer componente
// USAR!!!
export const useAuth = () => useContext(AuthContext);

