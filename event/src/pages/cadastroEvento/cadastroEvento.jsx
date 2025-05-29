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

    async function deletarEvento(id) {
        Swal.fire({
            title: 'Tem Certeza?',
            text: "Essa ação não poderá ser desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#B51D44',
            cancelButtonColor: '#000000',
            confirmButtonText: 'Sim, apagar!',
            cancelButtonText: 'Cancelar',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await api.delete(`eventos/${id.idEvento}`);
                alertar("success", "Evento Excluido!");
            }
        }).catch(error => {
            console.log(error);
            alertar("error", "Erro ao Excluir!");
        })
    }


    async function editarEvento(evento) {
        try {
            const tiposOptions = listaTipoEvento
                .map(tipo => `<option value="${tipo.idTipoEvento}" ${tipo.idTipoEvento === evento.idTipoEvento ? 'selected' : ''}>${tipo.tituloTipoEvento}</option>`)
                .join('');

            const { value } = await Swal.fire({
                title: "Editar Tipo de Evento",
                html: `
        <input id="campo1" class="swal2-input" placeholder="Título" value="${evento.nomeEvento || ''}">
        <input id="campo2" class="swal2-input" type="date" value="${evento.dataEvento?.substring(0, 10) || ''}">
        <select id="campo3" class="swal2-select">${tiposOptions}</select>
        <input id="campo4" class="swal2-input" placeholder="Categoria" value="${evento.descricao || ''}">
      `,
                showCancelButton: true,
                confirmButtonText: "Salvar",
                cancelButtonText: "Cancelar",
                focusConfirm: false,
                preConfirm: () => {
                    const campo1 = document.getElementById("campo1").value;
                    const campo2 = document.getElementById("campo2").value;
                    const campo3 = document.getElementById("campo3").value;
                    const campo4 = document.getElementById("campo4").value;

                    if (!campo1 || !campo2 || !campo3 || !campo4) {
                        Swal.showValidationMessage("Preencha todos os campos.");
                        return false;
                    }

                    return { campo1, campo2, campo3, campo4 };
                }
            });

            if (!value) {
                console.log("Edição cancelada pelo usuário.");
                return;
            }

            console.log("Dados para atualizar:", value);

            await api.put(`eventos/${evento.idEvento}`, {
                nomeEvento: value.campo1,
                dataEvento: value.campo2,
                idTipoEvento: value.campo3,
                descricao: value.campo4,
            });

            console.log("Evento atualizado com sucesso!");
            Swal.fire("Atualizado!", "Dados salvos com sucesso.", "success");
            listarEvento();

        } catch (error) {
            console.log("Erro ao atualizar evento:", error);
            Swal.fire("Erro!", "Não foi possível atualizar.", "error");
        }
    }

    async function descricaoEvento() {
        Swal.fire({
            title: "<strong>HTML <u>example</u></strong>",
            icon: "info",
            html: `
            You can use <b>bold text</b>,
            <a href="#" autofocus>links</a>,
            and other HTML tags
            `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `
             <i class="fa fa-thumbs-up"></i> Great!
             `,
            confirmButtonAriaLabel: "Thumbs up, great!",
            cancelButtonText: `
            <i class="fa fa-thumbs-down"></i>
             `,
            cancelButtonAriaLabel: "Thumbs down"
        });
    }

    useEffect(() => {
        listarTipoEvento();
        listarEvento();
    }, [listaEvento])

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

                <Lista titulo="Eventos"
                    tipos="Nome Evento"

                    tipos2="Tipo Evento"
                    lista={listaEvento}

                    nome="Nome"
                    nome2="Tipo evento"
                    titulocoluna1="Nome do Evento"
                    titulocoluna2="Data"
                    titulocoluna3="Evento"
                    titulocoluna4="Editar"
                    titulocoluna5="Excluir"
                    titulocoluna6="Descricao"


                    funcExcluir={deletarEvento}
                    funcEditar={editarEvento}
                    funcDescricao={descricaoEvento}



                />
            </main>
            <Footer />
        </>
    )
}

export default CadastroEvento;
