import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import PhotoComments from "./PhotoComments";
import styles from "./PhotoContent.module.css";
import PhotoDelete from "./PhotoDelete";
import Image from "../Helper/Image";
//puxamos os dados de data, e chamamos o user para fazer uma verificação para que o botão delete funcione, utilizamos um ternário e executamos da seguinte forma, caso o user e o username seja igual o autor da foto, o botão delete vai aparecer, caso contrário, vai aparecer o link para o perfil do autor.
const PhotoContent = ({ data, single }) => {
  // adicionamos o single, que significa que é singular que é apenas para uma página e não para um modal, vamos fazer uma validação que caso o single esteja como true ele recebe outro estilo
  const user = React.useContext(UserContext);
  const { photo, comments } = data;
  return (
    // Passamos então o single, é caso o single seja true, ele vai aplicar o styles de single e não de photo
    <div className={`${styles.photo} ${single ? styles.single : ""}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user.data && user.data.username === photo.author ? (
              <PhotoDelete id={photo.id} />
            ) : (
              <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}

            <span className={styles.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} Kg</li>
            <li>
              {photo.idade <= 1 ? `${photo.idade} Ano` : `${photo.idade} Anos`}
            </li>
          </ul>
        </div>
      </div>
      <PhotoComments single={single} id={photo.id} comments={comments} />
    </div>
  );
};

export default PhotoContent;
