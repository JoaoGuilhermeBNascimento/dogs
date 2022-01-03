import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { ReactComponent as MinhasFotos } from "../../Assets/feed.svg";
import { ReactComponent as Estatisticas } from "../../Assets/estatisticas.svg";
import { ReactComponent as AdicionarFoto } from "../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../Assets/sair.svg";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  // max-width: abaixo de 40rem eu quero um valor e acima quero outro
  // chamamos de mobile o nosso custom hook criado em useMedia
  const mobile = useMedia("(max-width: 40rem)");
  //criamos uma função reativa para saber se o mobile está ativo ou fechado 
  const [mobileMenu, setMobileMenu] = React.useState(false);
  
  const { pathname } = useLocation();
  //esse efeito foi criado para que quando clicarmos e mudar o pathname( o caminho da página) o botão do menu desative(ele feche automatico) 
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);
  //dentro de nav temos NavLink porque vamos colocar um estilo de ativo nela, e dividimos ele em 3, sendo eles o /conta /conta/estatisticas e /conta/postar! Isso cria um caminho de navegação para cada um designado!
  //Criamos um botão de sair  no onClick={} vamos usar o userLogout criado no userContext que faz resetar o token e todos os dados do localstorage

  //Dentro dos NavLink, foi colocado icones para os links, então importamos da pasta os svg, mas primeiro chamamos o ReactComponent e damos o nome como queremos como 'AS' e chamamos cara um dentro do link  e inserimos da forma  conforme comos os 'AS' por exemplo ... <MinhasFotos />

  //Mobile -- com a função do mobile criada definimos que os nomes só irão aparecer para o mobile, então caso a tela alcance o max-width de 40rem ele irá aparecer os nome para ficar no formato do mobile 
  return (
    // esse botão é para incluir o menu quando o modo mobile ficar ativo, então a condição é que, o mobile &&(sendo true) ele ativa o botão
    // dentro de class name criamos uma validação que o   situações para que o style.mobilebuttonActive só fique ativo caso a pessoa clicar no mobileMenu
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
      //dentro dos nav colocamos um ternário para aparecer o estilo de navegação do mobile só se o mobile estiver ativo, caso contrário permanecerá o style.nav. Além disso, é colocado que caso o mobile menu esteja ativo ele irá entrar em um modo de configuração de mobile
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink
          to="/conta"
          end
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          <MinhasFotos />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink
          to="/conta/estatisticas"
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          <Estatisticas />
          {mobile && "Estatísticas"}
        </NavLink>
        <NavLink
          to="/conta/postar"
          className={(navData) => (navData.isActive ? "active" : "")}
        >
          <AdicionarFoto />
          {mobile && "Adicionar Foto"}
        </NavLink>
        <button onClick={userLogout}>
          <Sair />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
