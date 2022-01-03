import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import { UserContext } from "../UserContext";
import Button from "./Forms/Button";

// para termos acesso ao usuario João de UserContext, no Header é preciso importar o contexto
// Para utilizar esse contexto e puxar o valor de usuario João é atraves de um hook usecontext e passamos o contexto

const Header = () => {
  //passou data no header para poder alterar quando o usuário fizer login e não ficar aparecendo login/criar
  const { data } = React.useContext(UserContext);
  return (
    // Criamos um ternário para data, isto significa que, caso o usuário esteja logado ele irá levar o usuário para /conta é vai mostrar o nome do usuário logado baseado na data, que é as informações do usuário, caso contrário, irá permanecer aparecendo login / criar conforme segunda parte, dada como false, no segundo link do ternário
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login/Criar{" "}
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
