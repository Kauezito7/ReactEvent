import "./Cadastro.css";
import Botao from "../botao/Botao";


const Cadastro = (props) => {
    return (
        <main className="layout_grid main_cadastro">
            <div className="titulo">
                <h1>{props.tituloCadastro}</h1>
                <hr />
            </div>

            <section className="section_cadastro">
                <div className="banner_cadastro">
                    <img src={props.imagem} alt="Fundo banner do cadastro eventos" />
                </div>

                <form onSubmit={props.funcCadastro} className="form_cadastro">

                    <div className="campos_cadastro">
                        <div className="campo_cad_titulo">
                            <label htmlFor="titulo"></label>
                            <input
                                type="text"
                                name="nome"
                                placeholder={props.namePlace}
                                value={props.valorInput}
                                onChange={(e) => props.setValorInput(e.target.value)}
                            />

                            <input
                                style={{ display: props.visibilidade }}
                                type="date"
                                name="nome"
                                placeholder={props.namePlace2}
                                value={props.valorData}
                                onChange={(e) => props.setValorData(e.target.value)}
                                
                            />

                            {/* <label htmlFor="tipoEvento"></label> */}
                            <select name="tipoEvento" id=""
                                style={{ display: props.visibilidade }}
                                value={props.valorTpEvento}
                                onChange={(e) => props.setValorTpEvento(e.target.value)}>
                                <option value="" disabled selected>Tipo Evento</option>
                                {props.lista &&
                                    props.lista.length > 0 &&
                                    props.lista.map((itemEvento) =>
                                        <option value={itemEvento.idTipoEvento}>{itemEvento.tituloTipoEvento}</option>
                                )}

                            </select>

                            <select name={props.select2} id="" style={{ display: props.visibilidade }}>
                                <option value="" disabled selected>Instituicao</option>
                                <option value="1D4F3D51-743B-41C0-B148-538DAA48BE32"> SENAI  </option>

                            </select>

                            {/* <input
                                style={{ display: props.visibilidade }}
                                type="text"
                                name="nome"
                                placeholder={props.namePlace3}
                                value={props.valorInput3}
                                onChange={(e) => props.setValorInput(e.target.value)}
                            /> */}

                            <textarea name="" id="" style={{ display: props.visibilidade }}
                                value={props.valorInputDescricao}
                                onChange={(e) => props.setValorInputDescricao(e.target.value)}
                                placeholder="Descrição">
                                <label htmlFor="">Descrição</label>
                            </textarea>

                        </div>

                        <Botao nomeDoBotao="Cadastrar" />
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Cadastro;



