//O contexto irá permitir passarmos dados/estado a todos os componente, sem a necessidade de utilizar propriedades. Serve principalmente para dados/estados globais como por exemplo dados do usuário logado
import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";
// vamos criar nosso contexto nessa etapa, export 2 elementos
export const UserContext = React.createContext();
//No userStorage vamos envolver todos os elementos que terão acesso a essee contexto e então definimos o usercontext, para isso é necessário passar o children
export const UserStorage = ({ children }) => {
  // data e setData é para armazenar os dados do usuário
  const [data, setData] = React.useState(null);
  //O estado de login e setlogin e para verificar se o usuário está logado ou não, ele começa como null pq não sabemos se tem usuário logado pq não finalizamos a aplicação
  const [login, setLogin] = React.useState(null);
  // O loading e o estado de carregamento enquanto faz a requisição do usuário
  const [loading, setLoading] = React.useState(false);
  //Caso tente puxar algum usuário e der erro definimos um estado de erro
  const [error, setError] = React.useState(false);
  //aqui no get user vamos fazer outro FETCH com o ENDPOINT USER_GET
  // o get user é para puxar o usuário e recebemos o token
  const navigate = useNavigate();
  // uso está função para designar para onde a página deve navegar em um momento específico

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    //Como usamos o getuser para pegar os dados do usuário setamos a data para atualizar e setamos o login para mostrar que o usuário conseguiu logar
    setData(json);
    setLogin(true);
  }
  //agora já posso fazer no fetch a url e as options e fazer uma função assincrona
  //com window. localStorage colocamos o token dentro do localstorage, definimos a chave que é token e passamos o valor que está dentro de json.token
  //user login vai ser o método que irá logar o usuário
  async function userLogin(username, password) {
    // o token post irá passar username e password para o body
    try {
      //neste momento quando ele tentar fazer o login colocamos quaisquer erro pra null e o setLoading começa pra true e desabilitamos o botão enquanto estiver carregando
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      if (!tokenRes.ok) throw new Error(" Usuário ou senha inválidos");
      const { token } = await tokenRes.json();
      window.localStorage.setItem("token", token);
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      //neste caso houve algum erro ao logar, então o programa seta login como false e seta a mensagem de erro
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }
  //No userLogout resetamos todos os parametros passados anteriormente para que quando o usuário faça login o token também seja removido do local storage, após esses procedimentos o navigate encaminha o usuário para a página de login
  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem("token");
      navigate("/login");
    },
    [navigate]
  );
  React.useEffect(() => {
    // neste Effect,vamos validar o token!

    async function autoLogin() {
      const token = window.localStorage.getItem("token");
      if (token) {
        // Aqui fazemos uma 'triagem', com try e catch para tratarmos certos erros, no primeiro momento o SETERROR COMEÇA COMO NULO E  O LOGIN TRUE, pois foi identificado que há um token no localStorage então ele faz o fetch do url e da options e puxa o token, caso a response seja negativa ele joga um novo erro como token inválido e ativa a função do userLogout que reseta tudo,
        try {
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");
          //Nesta fase da linha 80, não precisamos transformar em json, mas sim pegar o usuário com o getUser e passando como parametro o token. Após feita a validação ele joga o getUser e loga automático.
          await getUser(token);
        } catch (err) {
          //neste momento é passado o userLogout para caso aconteça qualquer erro ele reseta tudo e remove o token que está com erro do localstorage
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
    //passamos o userLogout como depedência pois precisamos passar como dependencia quaisquer função criada do lado de fora
  }, [userLogout]);
  return (
    //para envolver todos os elementos devemos passar o children
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
