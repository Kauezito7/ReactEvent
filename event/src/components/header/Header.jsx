import "./Header.css"
import Logo1 from "../../assets/img/logo1.svg"
import administracao from "../../assets/img/administracao.png"
import { Link } from "react-router-dom"

const Header = (props) => {
    return (
        <header>
            <div className=" cabecalho">
                <img src={Logo1} alt="Logo Evento" />
                <nav className="nav_header">
                    <Link href="" to="/telahome" className="link_header">Home</Link>
                    <Link href="" to="/TipoEvento" className="link_header">Eventos</Link>
                    <Link href="" to="/TipoUsuario" className="link_header">Usuários</Link>
                    <Link href="" to="" className="link_header">Contatos</Link>
                </nav>
                <div className="Adm">
                    <a href="" className="link_header">{props.nomeusu}</a>
                    <img src={administracao} alt="Vetor" />
                </div>

            </div>
        </header>
    )
}

export default Header;