import "./Login.css"
import Botao from "../../components/botao/Botao";
import Logo1 from "../..//assets/img/logo1.svg";
import api from "../../Services/services"
import { useState } from "react";
import Swal from "sweetalert2";
import { userDecodeToken } from "../../auth/Auth";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    
    const navigate = useNavigate();

     function alertar(icone, mensagem) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: icone,
                title: mensagem
            });
        }

    async function realizarAutenticacao(e) {
        e.preventDefault();

        const usuario = {
            email: email,
            senha: senha
        }
        if(senha.trim() != "" || email.trim() != ""){

            try {
                const resposta = await api.post("Login", usuario);

                const token = resposta.data.token;
                
                if(token){
                    //token sera decodificado:
                    const tokenDecodificado = userDecodeToken(token);
                    
                    // Armazenando:
                    secureLocalStorage.setItem("nomem", JSON.stringify(tokenDecodificado));

                    if(tokenDecodificado.tipoUsuario === "aluno"){
                        //redirecionar a tela de aluno (branca)
                        navigate("/ListaEvento")
                    }else{
                        //ele vai me encaminhar pra tela cadastro (vermelha)
                        navigate("/Evento")
                    }
                }
            } catch (error) {
                console.log(error);
                alertar("error", "Email ou Senha invalidos. !!")
            }
        }else{
            alertar("error", "preencha os campos vazios!")
        }
    }

    return (
        <main className="main_login">
            <div className="banner"></div>
            <section className="section_login">
                <img src={Logo1} alt="Logo do Event" />
                <form action="" className="form_login" onSubmit={realizarAutenticacao}>
                    <div className="campos_login">
                        <div className="campo_input">
                            <label htmlFor="email"></label>
                            <input type="email"
                                name="email"
                                placeholder="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="campo_input">
                            <label htmlFor="senha"></label>
                            <input type="password"
                                name="senha"
                                placeholder="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                    </div>

                    <a href="https://www.youtube.com/">Esqueceu a senha? </a>
                    <Botao nomeDoBotao="Login" />
                </form>
            </section>
        </main>
    )
}

export default Login;

