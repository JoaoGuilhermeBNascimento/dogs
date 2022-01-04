import React from "react";
import styles from "./FeedPhotosItem.module.css";
import Image from '../Helper/Image'


//aqui citamos o photo como propriedade, e como é uma lista de item ul vamos retornar uma li
const FeedPhotosItem = ({ photo, setModalPhoto }) => {
  function handleClick() {
    setModalPhoto(photo)
  }
  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.visualizaçao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
