import "./Header.css"
import Logo1 from "../../assets/img/logo1.svg"
import administracao from "../../assets/img/administracao.png"


const Header = (props) => {
    return (
        <header>
            <div className=" cabecalho">
                <img src={Logo1} alt="Logo Evento" />
                <nav className="nav_header">
                    <a href="" className="link_header">Home</a>
                    <a href="" className="link_header">Eventos</a>
                    <a href="" className="link_header">Usuários</a>
                    <a href="" className="link_header">Contatos</a>
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