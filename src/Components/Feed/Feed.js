import React from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
//fizemos a importação do prop types pq o usuário pode ter 2 tipo de tipo
import PropTypes from "prop-types";

// passamos o usuário no feed é no  FeedPhotos porque é onde eu faço o fetch das fotos em geral
const Feed = ({ user }) => {
  //criamos um estado reativo para a foto
  const [modalPhoto, setModalPhoto] = React.useState(null);
  // para que criarmos uma forma de que o page seja reativo, para que ele sempre carregue o FeedPhotos,
  const [pages, setPages] = React.useState([1]);
  //Scroll infinito
  //Criamos esse useEffect para adicionar o scroll e o wheel, colocamos o wheel porque quando ele chega no fim da página, apenas o wheel e executado
  const [infinite, setInfinite] = React.useState(true);
  // neste estado infinite ele vai definir se deve continuar puxando ou não os valores das páginas ou se já acabaram
  React.useEffect(() => {
    let wait = false;
    function infinitScroll() {
      // essa função só irá ocorrer se infinite for igual a true
      if (infinite) {
        // Toda vez que der infinitiScroll vai add mais um item, então pegamos o pages e desestruturamos as páginas que já existirem e vamos adicionar um numero
        // podemos ler da seguinte forma, ele vai pegar pages que começa com 1, o pages.length vai ser um é vai adicionar mais um. quando pages for 2 ele vai adicionar mais um e vai virar 3  e assim consecutivamente
        // Porém é necessário verificar se a pessoa realmente chegou ao final da página, porque se não fica carregando toda vez que ativar o wheel ou scroll
        const scroll = window.scrollY;
        // scrollY é o total de scroll que deu na página
        const height = document.body.offsetHeight - window.innerHeight;
        // após verificar os log e entender, defini que, eu vou querer que a pagina scrolle só quando o scroll for pelo menos 75% maior que o tamanho da página
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          // para que a função não fique ativando varias vezes seguidas ele tenta renderizar a página novamente, então solicitamos que ele so vai ativar após 500mili seconds
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }
    //sempre importante limpar os addeventlistener!!!!!!!!
    window.addEventListener("wheel", infinitScroll);
    window.addEventListener("scroll", infinitScroll);
    return () => {
      window.removeEventListener("wheel", infinitScroll);
      window.removeEventListener("scroll", infinitScroll);
    };
  }, [infinite]);

  return (
    //Só vamos mostrar o FeedModal se o modalPhoto existir
    //Quando clicarmos no item queremos que seja modificado o setModalPhoto,
    // Criamos um MAP do pages, que colocamos dentro de um array para setar as páginas
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}

      {pages.map((page) => (
        <FeedPhotos
          user={user}
          key={page}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}
      {!infinite && !user && (
        <p
          style={{
            textAlign: "center",
            padding: "2rem 0 4rem 0",
            color: "#888",
          }}
        >
          Não existem mais postagens.
        </p>
      )}
    </div>
  );
};
//Aqui criamos um padrão( um default) para previnir o erro
Feed.defautlProps = {
  user: 0,
};
// aqui definimos que o user pode ser um número ou uma string
Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};
export default Feed;
