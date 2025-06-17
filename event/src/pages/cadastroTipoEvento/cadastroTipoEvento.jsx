import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import Banner from "../../assets/img/evento.png"

import api from "../../Services/services"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const CadastroTipoEvento = () => {

    const [tipoEvento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([]);
    // const [atualizaTipoEvento, setAtualizarTipoEvento] = useState(false);

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

    async function cadastrarTipoEvento(evt) {

        evt.preventDefault();

        if (tipoEvento.trim() !== "") {
            try {
                await api.post("tiposEventos", { tituloTipoEvento: tipoEvento })
                alertar("success", "Sucesso! Cadastro realizado com sucesso!");
                setTipoEvento("")

            } catch (error) {
                console.log(error);

            }
        } else {
            alertar("error", "Erro! Preencha os campos")
        }
    }


    async function listarTipoEvento() {
        try {
            const resposta = await api.get("tiposEventos");
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.error(error);
        }
    }


    async function excluirTipoEvento(idTipoEvento) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });

        const result = await swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Não será possível reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });
        if (result.isConfirmed) {
            try {
                await api.delete(`tiposEventos/${idTipoEvento.idTipoEvento}`);
                swalWithBootstrapButtons.fire(
                    "Deletado!",
                    "O evento foi deletado com sucesso.",
                    "success"
                );
                listarTipoEvento();
            } catch (error) {
                console.log(error);
                Swal.fire("Erro!", "Não foi possível deletar o evento.", "error");
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                "Cancelado",
                "O evento não foi deletado.",
                "error"
            );
        }
    }

    async function atualizarTipoEvento(tipoEvento) {
        console.log(tipoEvento);

        const { value: novoTipoEvento } = await Swal.fire({
            title: "Digite o novo gênero",
            input: "text",
            inputLabel: "Novo gênero",
            inputValue: tipoEvento.tituloTipoEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });

        if (novoTipoEvento) {
            try {
                console.log("Antigo:", tipoEvento.tituloTipoEvento);
                console.log("Novo:", novoTipoEvento);

                await api.put(`tiposEventos/${tipoEvento.idTipoEvento}`, {
                    tituloTipoEvento: novoTipoEvento
                });


                Swal.fire(`Evento modificado para: ${novoTipoEvento}`);
            } catch (error) {
                console.error("Erro ao atualizar:", error);
            }
        }
    }

    

    useEffect(() => {
        listarTipoEvento();
    }, [listaTipoEvento]);


    return (
        <>
            <Header nomeusu="Administrador" />
            <main>
                <Cadastro
                    tituloCadastro="Cadastro Tipo de Eventos"
                    namePlace="Titulo"
                    visibilidade="none"
                    imagem={Banner}
                    funcCadastro={cadastrarTipoEvento}
                    valorInput={tipoEvento}
                    setValorInput={setTipoEvento}
                />

                <Lista
                   titulo="Lista tipo de Eventos"
                    lista={listaTipoEvento}
                    tipoLista="TiposEventos"
                    chaveNome="tituloTipoEvento"
                    chaveId="idTipoEvento"
                    nomePlace="Titulo"
                    visibilidadeD="none"
                    visibilidade2="none"
                    funcEditar={atualizarTipoEvento}
                    funcExcluir={excluirTipoEvento}
                    titulocoluna1= "Titulo"
                    
                    titulocoluna3= "Editar"
                    titulocoluna4= "Excluir"
                    
                />

            </main>
            <Footer />
        </>
    )
}

export default CadastroTipoEvento;
