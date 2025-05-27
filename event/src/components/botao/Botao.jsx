import "./Botao.css"

const Botao = (props) => {
    return(
        <button className="botao" type="submmit">{props.nomeDoBotao}</button>
    )
}

export default Botao;