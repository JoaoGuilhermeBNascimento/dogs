import React from "react";
import UserHeaderNav from "./UserHeaderNav";
import styles from "./UserHeader.module.css";
import { useLocation } from "react-router-dom";

const UserHeader = () => {
  //definimos um estado para title para que ele se torne reativo
  const [title, setTitle] = React.useState("");
  //chamamos o hook useLocation para sabermos onde estamos na página, dentro do location tem o pathname, que é o caminho e podemos definir um título diferente a partir disso
  const location = useLocation();
  //Criamos então um efeito desestruturamos o pathname de dentro do location e setamos o titulo para outro valor. definimos um switch de um valor que queremos verificar, que é o pathname, abrimos um case para cada caso para setarmos um title conforme o pathname!! Por último definimos um default caso não seja nenhum dos outros case, que no caso setamos o title para minha conta
  React.useEffect(() => {
    const { pathname } = location;
    switch (pathname) {
      case "/conta/postar":
        setTitle("Poste sua foto");
        break;
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      default:
        setTitle("Minha conta");
    }
  }, [location]);
  return (
    //Criamos o UserHeaderNav para ter o menu mobile e algumas outras lógicas então separamos ela do Header
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
