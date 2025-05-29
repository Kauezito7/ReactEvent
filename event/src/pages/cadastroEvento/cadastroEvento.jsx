import Banner from "../../assets/img/bannerCadastro.png";
import Lista from "../../components/lista/Lista";
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

import api from "../../Services/services"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const CadastroEvento = () => {

    const [evento, setEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([]);
    const [listaEvento, setListaEvento] = useState([]);
    const [data, setData] = useState("");
    const [tipoEvento, setTipoEvento] = useState("")
    const [descricao, setDescricao] = useState("");
    const [instituicoes, setInstituicoes] = useState("1D4F3D51-743B-41C0-B148-538DAA48BE32")

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

        // console.log(evento);
        // console.log(data);
        // console.log(descricao);
        // console.log(tipoEvento);
        // console.log(instituicoes);
    

        evt.preventDefault();

        if (evento.trim() !== "") {
            try {
                await api.post("Eventos", { nomeEvento: evento, dataEvento: data, descricao: descricao, idTipoEvento: tipoEvento, idInstituicao: instituicoes })
                alertar("success", "Sucesso! Cadastro realizado com sucesso!");
                setEvento("")
                setData()
                setTipoEvento("")
                setDescricao("")
                setInstituicoes("")

            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte!")
                console.log(error);

                // console.log({
                //     DataEvento: data,
                //     NomeEvento: evento,
                //     Descricao: descricao,
                //     IdTipoEvento: tipoEvento,
                //     IdInstituicao: instituicoes
                // });
            }
        } else {
            alertar("error", "Erro! Preencha os campos")
        }
    }


    // funcao para trazer os tipo de evento para meu select

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TiposEventos")
            setListaTipoEvento(resposta.data)
        } catch (error) {
            console.log(error);

        }
    }

       async function listarEvento() {
        try {
            const resposta = await api.get("Eventos");

            setListaEvento(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listarTipoEvento();
        listarEvento();
    }, [])

    return (
        <>
            <Header nomeusu="Administrador" />
            <main>
                <Cadastro tituloCadastro="Cadastro de Evento"
                    namePlace="Nome"
                    namePlace2="Data do evento"
                    namePlace3="Descricao"
                    
                    valorInput={evento}
                    setValorInput={setEvento}

                    funcCadastro={cadastrarEvento}

                    valorData={data}
                    setValorData={setData}

                    valorInputDescricao={descricao}
                    setValorInputDescricao={setDescricao}

                    valorTpEvento={tipoEvento}
                    setValorTpEvento={setTipoEvento}

                     valorInstituicao={instituicoes}
                    setValorInstituicao={setInstituicoes}
                    
                    lista={listaTipoEvento}

                    // onChange={(e) => setEvento(e.target.value)}
                    
                    // valorTpEvento={}
                    // valorTipoEvento={listaTipoEvento}
                    // setValorTipoEvento={setListaTipoEvento}

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
