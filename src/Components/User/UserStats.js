import React from "react";
import Head from "../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import { STATS_GET } from "../../api";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";
// importamos o userStatsGraph dessa forma porque é uma bible muito extensa, para não pesar nosso site, vamos colocar ela pra ser carregada apenas quando entrarem nas estatísticas 
const UserStatsGraphs = React.lazy(() => import("./UserStatsGraphs"));

// primeiro passo instalar a biblioteca victory com npm install victory, essa bible cuida dos gráficos
const UserStats = () => {
  // como vamos fazer uso do nosso useFetch, nós importamos essas informações
  const { data, error, loading, request } = useFetch();

  // assim que eu entrar na página eu quero que o efeito ocorra, então vamos usar o React.useEffect()
  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      const { response, json } = await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    // esse elemento faz a busca geral e vamos criar agora o elemento importando a bible victory dentro do useStatsGraph, que é onde vamos montar a lógica de recepção de informações e transformação em gráficos
    return (
      // quando passarmos um import via const, temos que trazer com ele o React.Suspense e passar um fallback, isso fará com que aquela parte específica só irá ser carregada quando chamada 
      <React.Suspense fallback={loading}>
        <Head title="Estatísticas" />
        Estatísticas
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else return "Sem data";
};

export default UserStats;
