import React from "react";
import { useParams } from "react-router-dom";
import { PHOTO_GET } from "../../api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "./PhotoContent";

const Photo = () => {
  // use params é um hook do react router dom
  const { id } = useParams();
  //fizemos um fetch puxando as propriedades abaixo
  const { data, loading, error, request } = useFetch();
  // fizemos um request de um endpoint de photo_get(id) e vamos puxar a foto e apresentar os comentários.
  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id);

    request(url, options);
  }, [request, id]);
  // primeira verificação, se tem erro, depois loading e posteriormente caso tenha data ele vai ativar o return
  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      //passou a propriedade usada no css pra puxar as configurações definidas anteriormente
      //faltou
      <section className="container mainContainer">
        <PhotoContent single={true} data={data} />
      </section>
    );
  else return null;
};

export default Photo;
