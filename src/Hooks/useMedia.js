import React from "react";
//Hook criado para identificar se o app está sendo utilizado em um mobile
// criamos uma função que recebe media(que é o max-width)
//com esse hook temos acesso ao true or false referente ao max-width de forma reativa, fazendo com que seja identificado qualquer resize na página e também que o app identifique se está no modo mobile
const useMedia = (media) => {
  //Aplicamos um estado reactivo no match
  const [match, setMatch] = React.useState(null);
//criamos um efeito com callback e criamos uma função para mudar o match e modificamos o estado no setMatches 
  React.useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }
    //a função vai ocorrer toda vez que houver o resize no window   
    changeMatch();
    //isto significa que toda vez que houver o resize, ele vai jogar a função changeMatch
    window.addEventListener("resize", changeMatch);
    return () => {
      //toda vez que adicionamos evento no window, temos que limpar o elemento no return
      window.removeEventListener("resize", changeMatch);
    };
  }, [media]);
//colocamos como dependencia o media, pois caso ele mude a função precisa saber
  return match;
};

export default useMedia;
