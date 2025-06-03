import "./ListagemDeEventos.css"
import Footer from "../../components/footer/Footer";
import Comentario from "../../assets/img/Comentario.png"
import Header from "../../components/header/Header";
import Ligado from "../../assets/img/Ligado.png"
import Desligado from "../../assets/img/Desligado.png"
import { useEffect, useState } from "react";
import Toggle from "../../components/toggle/toggle";
import api from "../../Services/services"
import { format } from "date-fns";
import Modal  from "../../components/modal/Modal";



const ListagemEventos = () => {
    const [toggled, setToggled] = useState(false);

    const [listaEvento, setListaEvento]= useState ([]);
    async function listarEventos(){
        try {
            const eventoListado = await api.get ("eventos")
            setListaEvento(eventoListado.data)
        } catch (error) {
            console.log(error);          
        }
    }
    useEffect(() => {
        listarEventos();
    },[])
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
                            <td data-cell="Editar"><img src={Comentario} alt="Imagem de comentar" /></td>
                            <td data-cell="Botao"><Toggle/></td>                       
                        </tr>
                        )) 
                    ): (
                        <p>nenhum evento encontrado</p>
                    )}   
                    </tbody>                   
                </table>
                </div>
            </section>
            <Footer />

            <Modal/>
        </>
    )
}

export default ListagemEventos;