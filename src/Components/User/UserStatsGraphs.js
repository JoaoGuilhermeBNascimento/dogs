import React from "react";
import styles from "./UserStatsGraphs.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

const UserStatsGraphs = ({ data }) => {
  // foi passado uma array no graph, porque ele é criado a partir de uma array de itens
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    //para pegar os acessos e somar todos os valores, vamos fazer um map do setTotal
    // pra somar uma array de números eu uso o reduce, passamos o valor anterior e o valor próximo e somamos eles como foi feito no setTotal
    //criamos esse graphData, para que possamos passar direto os parametros que tiverem no data para o gráfico de barras da bible victory como colocado no victorybar 
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      };
    });

    setTotal(
      data.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b)
    );
    setGraph(graphData);
  }, [data]);
  return (
    <section className={` ${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          // Vamos passar os atributos para gerar esse gráfico, então passamos o data e passamos as informações sendo o eixo x o nome e o y os dados, para transformar uma array eu posso usar o map.
          // O innerRadius 50, cria um barrinha dentro do grafíco
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          //passamos um style aqui dentro pra escolher quais itens vamos estilizar
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: "#fff",
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: "#333",
            },
          }}
        />
      </div>
      //criamos uma div para ser o container do grafico de barras 
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
