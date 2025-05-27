import "./Login.css"
import Botao from "../../components/botao/Botao";
import Logo1 from "../..//assets/img/logo1.svg";

const Login = () => {
    return(
        <main className="main_login">
        <div className="banner"></div>
        <section className="section_login">
            <img src={Logo1} alt="Logo do Event" />
            <form action="" className="form_login">
                <div className="campos_login">
                    <div className="campo_input">
                        <label htmlFor="email"></label>
                        <input type="email" name="email" placeholder="username"/>
                    </div>
                    <div className="campo_input">
                        <label htmlFor="senha"></label>
                        <input type="password" name="senha" placeholder="password" />
                    </div>
                </div>

                <a href="https://www.youtube.com/">Esqueceu a senha? </a>
                <Botao nomeDoBotao = "Login"/>
            </form>
        </section>
        </main>
    )
}

export default Login;

