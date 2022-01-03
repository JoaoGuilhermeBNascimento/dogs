import React from "react";
import { COMMENT_POST } from "../../api";
//importamos o svg e colocamos ele como enviar!!
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import styles from "./PhotoCommentsForm.module.css";
//desestruturamos o ID e o setComments, pois informamos ele no PhotoComments
const PhotoCommentsForm = ({ id, setComments }) => {
  const [comment, setComment] = React.useState("");
  const { request, error } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    //aqui fazemos a importação do nosso endpoint para comentários no post puxando o id de quem está comentando e adicionando o comentário, esse request é feito quando o formulário é enviado, no casso quando o onSubmit fica ativo
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);
    //se o response for ok (isso significa que ele conseguiu postar os comentários, vamos pegar o setComments passando como call back os commentarios anteriores, vamos desestruturar os comentários antigos).
    if (response.ok) {
      //sempre importante passar um setComment vazio, pois sempre que comentarmos ele limpa a text area
      setComment("");
      //aqui passamos o json porque ele vai ser retornado da função quando o comentário for feito
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    //definimos o valor da text área como comment(comment REATIVO)
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
