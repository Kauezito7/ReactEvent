import "./Lista.css"
import Editar from "../../assets/img/Editar.png"
import Excluir from "../../assets/img/Excluir.png"
import Descricao from "../../assets/img/descricao.png"

const Lista = (props) => {
    return (
        <section className="listagem">
            <h1>{props.titulo}</h1>
            <hr />

            <div className="tabela">
                <thead>
                    <tr className="table_cabecalho">
                        <th>{props.titulocoluna1}</th>
                        <th>{props.titulocoluna2}</th>
                        <th>{props.titulocoluna3}</th>
                        <th>{props.titulocoluna4}</th>
                        <th>{props.titulocoluna5}</th>
                        <th>{props.titulocoluna6}</th>
                    </tr>
                </thead>
                <tbody>
                    {props.lista && props.lista.length > 0 ? (
                        props.lista.map((item) => (

                            <tr className="item_lista" key={props.tipoLista == "TiposEventos" ? item.idTipoEvento : item.IdTipoUsuario ? item.idEvento : item.idEvento}>

                                {/* Mostra o nome do item */}
                                <td data-cell="Nome" style={{ display: props.tipoEvento }}>{props.tipoLista == "TiposEventos" ? item.tituloTipoEvento : item.tituloTipoUsuario ? item.nomeEvento : item.nomeEvento}</td>

                                <td data-cell="Tipo Evento" style={{ display: props.visibilidade }}>{new Date(item.dataEvento).toLocaleDateString('pt-BR')}</td>

                                <td data-cell="Data Evento" style={{ display: props.visibilidade }}>{item.tiposEvento?.tituloTipoEvento}</td>

                                {/* Ícone para editar, chama a função passada por props */}
                                <td>
                                    <img
                                        className="icone_lista" src={Editar} alt="ícone de editar" style={{ cursor: "pointer" }}
                                        onClick={() => props.funcEditar(item)}
                                    />
                                </td>

                                {/* Ícone para excluir, chama a função passada por props */}
                                <td>
                                    <img
                                        className="icone_lista" src={Excluir} alt="ícone de excluir" style={{ cursor: "pointer" }}
                                        onClick={() => props.funcExcluir(item)}
                                    />
                                </td>



                                <td data-cell="Descrição" className="botao_edicao" style={{ display: props.visibilidade2 }}>
                                    <img src={Descricao}
                                        alt="Exclamação"
                                        onClick={() => props.funcDescricao(item)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Nenhum genero foi encontrado.</td>
                        </tr>
                    )}
                </tbody>
            </div>
        </section>
    )
}

export default Lista;
