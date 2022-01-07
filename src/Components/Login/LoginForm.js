import React from "react";
import { Link } from "react-router-dom";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button.module.css";
import Head from "../Helper/Head";

/* 
é feito um link dentro dessa página de login para cadastro, chamando link e chmanado o caminho para /login/criar, além disso foi dado o nome de cadastro para esse link
criamos o onSubmit que é qualquer ação de envio, e criamos a função dele com o que está dentro no caso o handleSubmit e fazmos o event.preventDefalut() para previnir que a página recarregue sempre que clicarmos
 Neste caso criamos uma página para chamar a url que neste caso é chamada de api, transformamos em uma função assincrona 

 -- Utilizamos um custom hook para fazer validação 
*/

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  // neste const foi desestruturado o UserContext para puxar o que queremos direto, agora temos acesso ao método que criamos chamado
  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }
  /* colocou o título no h1, colocamos o formulario para fazer o login do usuário já cadastrado, criando algo reativo para o username e o password, que é o que precisamos para logar o usuário
  Na linha 50 de tratamento do erro, lê-se, que caso houver error mostrar o paragrafo com o erro
  // no ternário loading, caso ele esteja verdadeiro, ou seja, o usuário foi validado e está logando o botão entrar fica desabilitado e irá mudar para carregando ao inves de ''entrar''
   */
  return (
    <section className="animeLeft">
      <Head title="Login" />

      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input
          label="Senha"
          type="password"
          value
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a senha ?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}> Cadastre-se </h2>
        <p>Ainda não possui conta ? cadastre-se no site.</p>
      </div>
      <Link className={stylesBtn.button} to="/login/criar">
        Cadastro
      </Link>
    </section>
  );
};

export default LoginForm;
