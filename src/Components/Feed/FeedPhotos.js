import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";

const FeedPhotos = ({ setModalPhoto }) => {
  const { data, loading, error, request } = useFetch();

  //Tudo que acontece quando a gente entra na página, vamos usar no Effect, criamos uma função async para puxar as fotos e criamos a lógica para puxar, que seria o request chamando url and options, mas antes temos que definir na nossa API esse endpoint
  React.useEffect(() => {
    async function fetchPhotos() {
      //quando colocamos o user: 0 eu não escolho nenhum usuário para puxar, significa que ele vai puxar de qlq usuário
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
      // response e json vem sempre do request
      const { json } = await request(url, options);
      console.log(json);
    }
    fetchPhotos();
    //essa função depende do request que está fora dela, então temos que declarar
  }, [request]);
  //sempre fazer uma verificação se tem algum erro, então fazemos o if error
  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      //Para mostrar as fotos, vamos fazer um map do data(o data contém cada item)
      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <FeedPhotosItem
            key={photo.id}
            photo={photo}
            setModalPhoto={setModalPhoto}
          />
        ))}
      </ul>
    );
  else return null;
};

export default FeedPhotos;
