import React from "react";
import { PHOTO_DELETE } from "../../api";
import useFetch from "../../Hooks/useFetch";
import styles from "./PhotoDelete.module.css";

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();
  //preciso fazer um fetch,
  //so precisamos do preventdefault para formulário
  async function handleClick() {
    //esse const serve para validar se a pessoa realmente quer excluir
    const confirm = window.confirm("Tem certeza que deseja deletar ?");
    //aqui validamos que se caso a pessoa clique em confirmar, vai ser executado o fetch
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response, json } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletando..
        </button>
      ) : (
        <button onClick={handleClick} className={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
