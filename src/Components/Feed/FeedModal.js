import React from "react";
import styles from "./FeedModal.module.css";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";

const FeedModal = ({ photo, setModalPhoto }) => {
  //nesse caso estamos fazendo o request novamente para puxar os comentários
  const { data, error, loading, request } = useFetch();

  //vamos ativar isso sempre que clicarem na foto ( sempre que o modal for aberto), então vamos utilizar um efeito para isso
  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
    //citamos como dependência o photo tbm, porque caso o photo mude, nosso effect também vai mudar
  }, [photo, request]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) setModalPhoto(null);
  }
  return (
    //essa div faz referência direta ao modal
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
