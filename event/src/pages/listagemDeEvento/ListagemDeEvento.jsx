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



const ListagemEventos = () => {
    // const [toggled, setToggled] = useState(false);

    const [listaEvento, setListaEvento] = useState([]);
    const [tipoModal, setTipoModal] = useState(""); // "descricaoEvento" ou "comentario"
    const [dadosModal, setDadosModal] = useState({}); // descricaoEvento, idEvento, etc.
    const [modalAberto, setModalAberto] = useState(false);

    const [usuarioId, setUsuarioId] = useState ("5DFBD257-AA7E-4067-8B7B-CDEE2A6C406C")


    async function listarEventos() {
        try {
            const resposta = await api.get("eventos")
            const todosOsEventos = resposta.data;

            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuarioId)
            const minhasPresencas = respostaPresenca.data;

            const eventosComPresencas = todosOsEventos.map(() => {

            })

            setListaEvento(eventosComPresencas)

            
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarEventos();
    }, [])

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
    return (
        <>
            <Header nomeusu="Aluno" />
            <section className="listagem_evento">
                <h1>Eventos</h1>
                <hr />
                <div className="tabela_evento">
                    <select name="Todos os Eventos" id="" className="select_evento">
                        <option value="" disabled selected>Todos os Eventos</option>
                        <option value="">op 1</option>
                        <option value="">op 2</option>
                        <option value=""> op 3</option>
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
                                listaEvento.map((item) => (
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
                                        <td data-cell="Botao"><Toggle /></td>
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