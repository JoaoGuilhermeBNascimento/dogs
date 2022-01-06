import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import { PHOTOS_GET } from "../../api";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";
// puxamos o usuário no FeedPhotos e colocamos ele dentro do endpoint
const FeedPhotos = ({ page, user, setModalPhoto, setInfinite }) => {
  const { data, loading, error, request } = useFetch();

  //Tudo que acontece quando a gente entra na página, vamos usar no Effect, criamos uma função async para puxar as fotos e criamos a lógica para puxar, que seria o request chamando url and options, mas antes temos que definir na nossa API esse endpoint
  React.useEffect(() => {
    async function fetchPhotos() {
      const total = 6;
      //quando colocamos o user: 0 eu não escolho nenhum usuário para puxar, significa que ele vai puxar de qlq usuário
      //citamos o user para que o usuário no minha conta só vejo fotos postadas pelo usuário principal
      const { url, options } = PHOTOS_GET({ page, total, user });
      // response e json vem sempre do request
      const { response, json } = await request(url, options);
      //se existir uma response e se essa response estiver ok, se o json( que é o item que tem a array que esta vindo da api for menos que o total que é igual a 3), se o json.length for menor que o total, significa que já esta no final porque significa que ele puxou uma página com 2 itens ou 1 item apenas. então setamos o infinite para false para que ele não execute a função do Feed, infiniteScroll
      if (response && response.ok && json.length < total) {
        setInfinite(false);
      }
    }

    fetchPhotos();
    //essa função depende do request que está fora dela, então temos que declarar
  }, [request, user, page, setInfinite]);
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
