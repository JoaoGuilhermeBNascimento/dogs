import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import { UserContext } from "../../UserContext";
import styles from "./Login.module.css";
import NotFound from "../NotFound";

/* Nesta parte definimos todas as rotas que queremos e não queremos que a página recarregue quando clicar em um dos elementos do login, como criar login, recuperar senha ou perdeu a senha
 o path inicial é sempre a barra, pois ela soma os outros elementos
 quando clicamos em login ele só mo
*/

const Login = () => {
  // esse login é um estado do context que será true or false
  const { login } = React.useContext(UserContext);
  // se tiver um usuário logado vai navegar o usuário para a página /conta
  if (login === true) return <Navigate to="/conta" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
