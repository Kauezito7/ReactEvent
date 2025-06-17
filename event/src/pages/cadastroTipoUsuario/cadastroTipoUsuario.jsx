import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import Banner from "../../assets/img/usuario.png"

import api from "../../Services/services"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'

const CadastroTipoUsuario = () => {

    // Estado para armazenar o nome do tipo de usuário que está sendo cadastrado
    const [tipoUsuario, setTipoUsuario] = useState("");
    // Estado para guardar a lista de tipos de usuário vindo da API
    const [listaTipoUsuario, setListaTipoUsuario] = useState([]);
    // Estado para controlar atualização da lista (não usado diretamente aqui)
    // const [atualizaTipoUsuario, setAtualizaTipoUsuario] = useState(false);

    // Função para mostrar alertas rápidos com SweetAlert2
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
            },
        });

        Toast.fire({
            icon: icone,
            title: mensagem,
        });
    }

    // Função para cadastrar novo tipo de usuário via API
    async function cadastrarTipoUsuario(e) {
        e.preventDefault(); // evita recarregar a página

        if (tipoUsuario.trim() !== "") {
            try {
                await api.post("tiposUsuarios", { tituloTipoUsuario: tipoUsuario });
                alertar("success", "Cadastro realizado com sucesso!");
                setTipoUsuario(""); // limpa o campo após cadastro
                listarTipoUsuario(); // atualiza a lista para mostrar o novo item
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte.");
                console.error(error);
            }
        } else {
            alertar("error", "Preencha o campo!");
        }
    }

    // Função para buscar a lista de tipos de usuário da API
    //lista todas as informacoes dentro da lista do TipoUsuario
    async function listarTipoUsuario() {
        try {
            const resposta = await api.get("tiposUsuarios");
            setListaTipoUsuario(resposta.data); // atualiza o estado com os dados
            console.log(resposta.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Função para excluir um tipo de usuário após confirmação
    async function excluirTipoUsuario(idTipoUsuario) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger",
            },
            buttonsStyling: true,
        });

        const result = await swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Não será possível reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`tiposUsuarios/${idTipoUsuario.idTipoUsuario}`);
                swalWithBootstrapButtons.fire(
                    "Deletado!",
                    "O usuario foi deletado com sucesso.",
                    "success"
                );
                listarTipoUsuario(); // atualiza a lista após exclusão
            } catch (error) {
                console.log(error);
                Swal.fire("Erro!", "Não foi possível deletar o usuario.", "error");
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                "Cancelado",
                "O usuario não foi deletado.",
                "error"
            );
        }
    }

    // Função para atualizar o nome do tipo de usuário via input SweetAlert2
    async function atualizarTipoUsuario(tipoUsuario) {
        console.log(tipoUsuario);

        const { value: novoTipoUsuario } = await Swal.fire({
            title: "Digite o novo usuário",
            input: "text",
            inputLabel: "Novo usuário",
            inputValue: tipoUsuario.tituloTipoUsuario,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            },
        });

        if (novoTipoUsuario) {
            try {
                console.log("Antigo:", tipoUsuario.tituloTipoUsuario);
                console.log("Novo:", novoTipoUsuario);

                await api.put(`tiposUsuarios/${tipoUsuario.idTipoUsuario}`, {
                    tituloTipoUsuario: novoTipoUsuario,
                });

                Swal.fire({
                    icon: "success",
                    title: "Sucesso!",
                    text: `Tipo de usuário atualizado para: ${novoTipoUsuario}`,
                });

                listarTipoUsuario(); // atualiza a lista para mostrar a mudança
            } catch (error) {
                console.error("Erro ao atualizar:", error);
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Não foi possível atualizar. Tente novamente.",
                });
            }
        }
    }

    // useEffect vai servir para carregar a lista ao montar o componente e sempre que listaTipoUsuario mudar ele ira mudar automaticamente
    useEffect(() => {
        listarTipoUsuario();
    }, [listaTipoUsuario]);

    return (
        <>
            <Header nomeusu="Administrador" />

            <Cadastro
                imagem={Banner}
                tituloCadastro="Cadastro Tipo de Usuário"
                namePlace="Titulo"
                visibilidade="none"
                valorInput={tipoUsuario}
                setValorInput={setTipoUsuario}
                onChange={(e) => setTipoUsuario(e.target.value)}
                funcCadastro={cadastrarTipoUsuario}

            />


            <Lista

                // titulo = "Lista Tipo Usuario"
                // namePlace="Titulo"
                // lista={listaTipoUsuario}
                // //tipoLista="TiposUsuarios"
                // visibilidade="table-cell"
                // chaveId="idTipoUsuario"
                // chaveNome="tituloTipoUsuario"


                // titulocoluna2="Tipo"
                // visibilidadeD="none"
                // visibilidade2="none"

                // titulocoluna3="Editar"
                // titulocoluna4="Excluir"

                // funcEditar={atualizarTipoUsuario}
                // funcExcluir={excluirTipoUsuario}

                titulo="Lista tipo de Usuario"
                lista={listaTipoUsuario}
                tipoLista="TiposUsuarios"
                chaveNome="TituloTipoUsuario"
                chaveId="IdTipoUsuario"
                nomePlace="Titulo"
                visibilidadeD="none"
                visibilidade2="none"
                funcEditar={atualizarTipoUsuario}
                funcExcluir={excluirTipoUsuario}
                titulocoluna1="Titulo"

                titulocoluna3="Editar"
                titulocoluna4="Excluir"
            />

            <Footer />
        </>
    )
}

export default CadastroTipoUsuario;
