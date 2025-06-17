import imgDeletar from "../../assets/img/imgDeletar.png"
import api from "../../Services/services"
import { useEffect, useState } from "react";
import "./Modal.css"
import { useAuth } from "../../contexts/AuthContext"


const Modal = (props) => {

  const [comentarios, setComentarios] = useState([]);
  // const [usuarioId, setUsuarioId] = useState("5DFBD257-AA7E-4067-8B7B-CDEE2A6C406C")
  const [novoComentario, setNovoComentario] = useState("")
  
  const { usuario } = useAuth();

  async function listarComentarios() {
    try {
      const resposta = await api.get(`ComentariosEventos/ListarSomenteExibe?id=${props.idEvento}`)

      setComentarios(resposta.data);

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    listarComentarios();
  }, [comentarios])

  async function cadastrarComentarios(comentario) {
    try {
      await api.post("ComentariosEventos", { idUsuario: usuario.idUsuario, idEvento: props.idEvento, Descricao: comentario })
    } catch (error) {
      console.log(error);

    }
  }

  async function deletarComentario(idComentario) {
    try {
      await api.delete(`ComentariosEventos/${idComentario}`);
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <>
      <div className="model-overlay" onClick={props.fecharModal}>
        <div className="model" onClick={(e) => e.stopPropagation()}>
          <h1>{props.titulo}</h1>
          <div className="model_conteudo">
            {props.tipoModel === "descricaoEvento" ? (
              <p>{props.descricao}</p>
            ) : (
              <>
                {comentarios.map((item) =>
                  <div key={item.idComentarioEvento}>
                    <strong>{item.usuario.nomeUsuario}
                    </strong>
                    <img src={imgDeletar} alt="Deletar" onClick={() => deletarComentario(item.idComentarioEvento)} />
                    <p>{item.descricao}</p>
                    <hr />
                  </div>
                )}
                <div>
                  <input type="text"
                    placeholder="Escreva seu comentario..."
                    value={novoComentario}
                    onChange={(e) => setNovoComentario(e.target.value)} />
                  <button onClick={() => cadastrarComentarios(novoComentario)}>
                    Cadastrar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal;



