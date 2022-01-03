import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserPhotoPost.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import Error from "../Helper/Error";
//utilizamos o nosso custom hook useForm, pois ele procede com validação dos campos para não passar nada em branco ou fora do regex, passamos o parametro de number e definimos no regex, também é possível definir
const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");
  const [img, setImg] = React.useState({});
  //desestruturamos tudo do useFetch
  const { request, data, error, loading } = useFetch();
  const navigate = useNavigate();

  //esse efeito vai ocorrer quando o data mudar, que significa que ele fez a postagem de um item, com esse efeito validamos que se existe alguma coisa dentro de data, ele navega para /conta
  React.useEffect(() => {
    if (data) navigate("/conta");
  }, [data, navigate]);
  //na função do handle submit, sempre colocar o event.preventDefault() para previnir de enviar antes de finalizar
  function handleSubmit(event) {
    event.preventDefault();
    // criamos  um formData para armazenar todos os dados que forem passados no input, no formdata adicionar usando o append
    const formData = new FormData();
    //formData.append('chave', valor que desejo pegar)
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    //temos que puxar o token
    const token = window.localStorage.getItem("token");
    //criamos um endpoint para fazer a postagem da foto, sem validação, pois para o usuário postar ele precisa está logado
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }
  // o handleimgchange recebe um evento e desestruturamos o target que é o que precisamos, foi passado um objeto no const pois vamos precisar de 2 valores
  function handleImgChange({ target }) {
      //preview, é para fornecer a foto antes de ser postada, usamos uma função de JS para transforma ele para URL que é o createobjectURL
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }
  return (
    //Para área de postagem de fotos criamos um form e dentro dele inseriamos os inputs e aplicamos o onSubmit para podermos enviar o formulário.
    // Sempre passar os nome desestruturados, para controlar os input com o item reativo criado e por fim inserindo as datas criadas 
    //Lidamos com o loading, utilizamos um ternário para verificar, caso o botão tenha sido ativo, ele desabilita e muda a mensagem, caso contrário ele fica habilitado como Enviar
    //tratamos o erro também, para informar quaisquer erro que vinher a acontecer.
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        
        <Error error={error} />
      </form>
      
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
    //criamos uma div e fazemos uma validação, caso exista o img.preview ele vai mostrar a imagem
  );
};

export default UserPhotoPost;
