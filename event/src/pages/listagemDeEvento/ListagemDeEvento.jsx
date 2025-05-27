import "./ListagemDeEventos.css"
import Footer from "../../components/footer/Footer";
import Comentario from "../../assets/img/Comentario.png"
import Header from "../../components/header/Header";
import Ligado from "../../assets/img/Ligado.png"
import Desligado from "../../assets/img/Desligado.png"
import { useState } from "react";
import Toggle from "../../components/toggle/toggle";



const ListagemEventos = () => {
    const [toggled, setToggled] = useState(false);
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
                    <thead>
                        <tr className="table_evento">
                            <th>Titulo</th>
                            <th>Tipo Evento</th>
                            <th>Comentarios</th>
                            <th>Participar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="campo_evento">
                            <td data-cell="Nome" >Nome Evento</td>
                            <td data-cell="Evento">Tipo Evento</td>
                            <td data-cell="Editar"><img src={Comentario} alt="Imagem de comentar" /></td>
                            <td data-cell="Botao"><Toggle/></td>                       
                        </tr>
                    </tbody>
                    <tbody>
                        <tr className="campo_evento">
                            <td data-cell="Nome" >Nome Evento</td>
                            <td data-cell="Evento">Tipo Evento</td>
                            <td data-cell="Editar"><img src={Comentario} alt="Imagem de comentar" /></td>
                            <td data-cell="Botao"><Toggle/></td>
                        </tr>
                    </tbody>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ListagemEventos;