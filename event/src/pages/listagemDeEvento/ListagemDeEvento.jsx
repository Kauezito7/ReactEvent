import "./ListagemDeEventos.css"
import Footer from "../../components/footer/Footer";
import Comentario from "../../assets/img/Comentario.png"
import Header from "../../components/header/Header";
// import Ligado from "../../assets/img/Ligado.png"
// import Desligado from "../../assets/img/Desligado.png"
import { useEffect, useState } from "react";
import Toggle from "../../components/toggle/toggle";
import api from "../../Services/services"
import { format } from "date-fns";
import descricao2 from "../../assets/img/descricao2.png"
import Modal from "../../components/modal/Modal";
import Swal from "sweetalert2";



const ListagemEventos = () => {
    // const [toggled, setToggled] = useState(false);

    const [listaEvento, setListaEvento] = useState([]);
    const [tipoModal, setTipoModal] = useState(""); // "descricaoEvento" ou "comentario"
    const [dadosModal, setDadosModal] = useState({}); // descricaoEvento, idEvento, etc.
    const [modalAberto, setModalAberto] = useState(false);

    //filtro
    const [filtroData, setFiltroData] = useState(["todos"])
  

    const [usuarioId, setUsuarioId] = useState("5DFBD257-AA7E-4067-8B7B-CDEE2A6C406C")
    


    async function listarEventos() {
        try {
            const resposta = await api.get("eventos")
            const todosOsEventos = resposta.data;

            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuarioId)
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);

                return{
                    // AS INFORMACOES TANTO DE EVENTOS QUANTO DE EVENTOS QUE POSSUEM PRESENCA
                    ...atualEvento,  // Mantem os dados originais do evento atual
                    possuiPresenca: presenca?. situacao === true,
                    idPresenca: presenca?. idPresencaEvento || null
                }
            })

            setListaEvento(eventosComPresencas)


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarEventos();
    }, [listaEvento])



    function abrirModal(tipo, dados) {
        //tipo de modal
        //dados 
        setTipoModal(tipo)
        setDadosModal(dados)
        setModalAberto(true)
    }

    function fecharModal() {
        setModalAberto(false)
        setDadosModal({})
        setTipoModal("")
    }

    async function manipularPresenca(idEvento, presenca, idPresenca) {
        try {
            if (presenca && idPresenca != "") {
                //atualizacao: situacao para FALSE 
                await api.put(`PresencasEventos/${idPresenca}`, {situacao: false});
                Swal.fire ('Removido!', 'Sua presenca foi removida.', 'success')
            }else if(idPresenca != ""){
                //atualizacao: situacao para TRUE
                await api.put(`PresencasEventos/${idPresenca}`, {situacao: true});
                Swal.fire('Confirmado!', 'Sua presenca foi confirmada.', 'success')
            }else{
                //cadastrar uma nova presenca
                // console.log(usuarioId)         
                const resp = await api.post("PresencasEventos", {situacao: true, idUsuario: usuarioId, idEvento: idEvento });
                Swal.fire('Confirmado!', 'Sua presenca foi confrimada.', 'success');
            }
        } catch (error) {
            console.log(error);            
        }
    }

    function filtrarEventos() {
        const hoje = new Date();

        return listaEvento.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);

            if (filtroData.includes("todos")) return true;
            if (filtroData.includes("futuros") && dataEvento > hoje)
                return true;
            if (filtroData.includes("passados") && dataEvento < hoje)
                return true;

            return false;
        })
    }

    return (
        <>
            <Header nomeusu="Aluno" />
            <section className="listagem_evento">
                <h1>Eventos</h1>
                <hr />
                <div className="tabela_evento">
                    <select name="Todos os Eventos" id="" className="select_evento" onChange={(e) => setFiltroData([e.target.value])}>
                        <option value="Todos" selected>Todos os Eventos</option>
                        <option value="futuros">Somente Futuros</option>
                        <option value="Passados">Somente Passados</option>
                    </select>
                    <table>
                        <thead>
                            <tr className="table_evento">
                                <th>Titulo</th>
                                <th>Data Evento</th>
                                <th>Tipo Evento</th>
                                <th>Descrição</th>
                                <th>Comentarios</th>
                                <th>Participar</th>
                            </tr>
                        </thead>
                        <tbody>

                            {listaEvento.length > 0 ? (
                                filtrarEventos() && filtrarEventos().map((item) => (
                                    <tr className="campo_evento">
                                        <td data-cell="Nome" >{item.nomeEvento}</td>
                                        <td>{format(item.dataEvento, "dd/MM/yy")}</td>
                                        <td data-cell="Evento">{item.tiposEvento.tituloTipoEvento}</td>
                                        <td>
                                            <img src={descricao2} alt="icon" onClick={() => abrirModal("descricaoEvento", { descricao: item.descricao })} />
                                        </td>
                                        <td>
                                            <img src={Comentario} alt="icon" onClick={() => abrirModal("comentarios", { idEvento: item.idEvento })} />
                                        </td>
                                        <td data-cell="Botao"><Toggle presenca={item.possuiPresenca} 
                                        manipular= {() => manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)}/></td>
                                    </tr>
                                ))
                            ) : (
                                <p>nenhum evento encontrado</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </section >

            {/* <Footer /> */}

            {modalAberto && (
                < Modal
                    titulo={tipoModal == "descricaoEvento" ? "Descricao do evento" : "Comentario"}
                    tipoModel={tipoModal}

                    idEvento={dadosModal.idEvento}
                    descricao={dadosModal.descricao}

                    fecharModal={fecharModal}
                />
            )}
        </>
    )
}

export default ListagemEventos;