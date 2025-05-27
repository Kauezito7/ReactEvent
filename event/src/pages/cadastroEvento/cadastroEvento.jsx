import Banner from "../../assets/img/bannerCadastro.png";
import Lista from "../../components/lista/Lista";
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

import api from "../../Services/services"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const CadastroEvento = () => {

const [evento, setEvento] = useState ("");

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

    async function cadastrarEvento(evt) {

        evt.preventDefault();

        if (evento.trim() !== "") {
            try {
                await api.post("Eventos", { nomeEvento: evento })
                alertar("success", "Sucesso! Cadastro realizado com sucesso!");
                setEvento("")

            } catch (error) {
                console.log(error);

            }
        } else {
            alertar("error", "Erro! Preencha os campos")
        }
    }


    return (
        <>
            <Header nomeusu="Administrador" />
            <main>
                <Cadastro tituloCadastro="Cadastro de Evento"
                    namePlace="Nome"
                    namePlace2="Data do evento"
                    namePlace3="Descricao"
                    funcCadastro={cadastrarEvento}

                    valorInput={evento}
                    setValorInput={setEvento}
                    onChange={(e) => setEvento(e.target.value)}

                    imagem={Banner}

                />

                <Lista titulo="Lista de eventos"
                    tipos="Nome Evento"
                    tipos2="Tipo Evento"
                    nome="Nome"
                    nome2="Tipo evento"


                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroEvento;
