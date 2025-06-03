import imgDeletar from "../../assets/img/imgDeletar.png"

const modal = (props) => {
  return (
    <>
    <div className="model-overlay" onClick={props.fecharModal}></div>
    <div className="model">
      <h1>{props.titulo}</h1>
      <div className="model_conteudo">
        {props.tipoModel === "descricaoEvento" ? (
         <p>{props.descricao}</p> 
        ):(
          <>
            {comentarios.map((item) => {
              <div key={item.idComentarioEvento}>
                <strong>{item.usuario.nomeUsuario}
                </strong>
                <img src={imgDeletar} alt="excluir" />
                <p>{item.descricao}</p>
                <hr />
              </div>
            })}
            <div>
              <input type="text" 
              placeholder="Escreva seu comentario..."/>
              <button>
                Cadastrar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  )
}

export default modal;



