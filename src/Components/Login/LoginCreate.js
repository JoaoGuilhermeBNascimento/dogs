import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import useForm from "../../Hooks/useForm";
import { USER_POST } from "../../api";
import { UserContext } from "../../UserContext";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Head from "../Helper/Head";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");
  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();
  // temos que criar um fetch para inserir os dados do novo usuário no Data e consequentemente no servidor

  async function handleSubmit(event) {
    event.preventDefault();
    //criamos um endpoint USER_POST para poder fazer a postagem do usuário no servidor, e colocamos no body dele usuario, email e senha e validamos cada um deles com o regex estabelecido no useForm
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    //Neste momento, executamos o fech trazendo a url e options e criamos uma condição de que caso todos os eventos de validação correce bem e a response do fetch fosse ok, ele iria validar o username e a senha do usuário e dar um navigate para /conta.
    const { response } = await request(url, options);
    if (response.ok) {
      userLogin(username.value, password.value);
    }
  }
  // no return definimos em section a class name como animeLeft pois já estava pronta, para a section o mesmo, aproveitamos o className criado para o titulo da página.
  // No form criamos o onSubmit e o submetemos a handleSubmit, depois inserimos o Input já criado anteriormente e definimos os 3 itens e o desestruturamos cada uma delas, pois estamos usando um hook useForm, é importante definir o type do password para não aparecer a senha.
  return (
    <section className="animeLeft">
      <Head title="Criar Conta" />

      <h1 className="title">Cadastra-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;
