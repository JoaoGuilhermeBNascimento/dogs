import React from "react";
import { Route, Routes } from "react-router-dom";
import UserHeader from "./UserHeader";
import Feed from "../Feed/Feed";
import UserPhotoPost from "./UserPhotoPost";
import UserStats from "./UserStats";
import { UserContext } from "../../UserContext";
import NotFound from "../NotFound";
import Head from "../Helper/Head";

const User = () => {
  //vamos puxar os dados do usuário, que é data. onde contém as informações.
  const { data } = React.useContext(UserContext);
  //no UserHeader, criamos um cabeçalho específico com uma navegação interna paara o usuário
  // Após isso criamos as rotas para o usuário dentro da página do usuário,LEMBRANDO que sempre criamos as routes primeiro e depois passamos as Route
  // quando o usuário estiver dentro de postar vai ser carregado a parte de postar foto do usuário, o UserPhotoPost e para ver as estatisticas ele vai ser carregado o UserStats
  return (
    <section className="container">
      <Head title="Minha Conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
