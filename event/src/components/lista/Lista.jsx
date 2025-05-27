import "./Lista.css"
import Editar from "../../assets/img/Editar.png"
import Excluir from "../../assets/img/Excluir.png"

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
                    </tr>
                </thead>
                <tbody>
                    {props.lista && props.lista.length > 0 ? (
                        props.lista.map((item) => (

                            <tr className="item_lista" key={item[props.chaveId]}>
                                {/* Mostra o nome do item */}
                                <td data-cell="Nome">{item[props.chaveNome]}</td>

                                {/* Mostra o gênero, pode ser ocultado conforme visibilidade */}
                                <td data-cell="Genero" style={{ display: props.visibilidade }}>
                                    {item.genero?.nome || ""}
                                </td>

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
                                        onClick={() => props.funcExcluir(item[props.chaveId])}
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
