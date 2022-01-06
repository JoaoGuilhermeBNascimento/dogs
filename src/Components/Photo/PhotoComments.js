import React from "react";
import { UserContext } from "../../UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";
//no photoContent nos informamos o id e os comentários, então só chamamos as props deles para reaproveitar aqui no PhotoComments
const PhotoComments = (props) => {
  // definimos os comentários como reativos pois sempre que houver um comentário novo, vai querer adicionar aos comentários já feitos, passamos um call back, porque ele vai rodar só uma vez e definir o estado inicial que no caso é props.comments
  const [comments, setComments] = React.useState(() => props.comments);
  const commentsSection = React.useRef(null);
  //passamos o login para fazer uma validação de que a parte de comentar só aparece para quem está logado
  const { login } = React.useContext(UserContext);
  //criamos uma ul, que é a lista dos comentários e fazemos um map para cada comentário, o botão B deixa em negrito, esses comment_id, comment_author e comment_content vem direto da API

  React.useEffect(() => {
    //esse efeito foi criado para que a barra de comentário sempre mostre os comentários mais recentes
    //Alem de ocorrer sempre que o comments mudar
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);
  //colocamos um ref no ul pois é nele que está nossa sessão de comentários
  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ""}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && (
        <PhotoCommentsForm
          single={props. single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
    // passamos para nosso formulário a função de atualização de comentários que é o setComments, passamos para o formulário e então vamos fazer uma validação com if no handleSubmit
  );
};

export default PhotoComments;
