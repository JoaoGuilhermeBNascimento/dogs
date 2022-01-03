import React from "react";
import { Route, Routes } from "react-router-dom";
import UserHeader from "./UserHeader";
import Feed from "../Feed/Feed";
import UserPhotoPost from "./UserPhotoPost";
import UserStats from "./UserStats";

const User = () => {
  //no UserHeader, criamos um cabeçalho específico com uma navegação interna paara o usuário
  // Após isso criamos as rotas para o usuário dentro da página do usuário,LEMBRANDO que sempre criamos as routes primeiro e depois passamos as Route
  // quando o usuário estiver dentro de postar vai ser carregado a parte de postar foto do usuário, o UserPhotoPost e para ver as estatisticas ele vai ser carregado o UserStats 
  return (
    <section className="container">
      
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estastisticas" element={<UserStats />} />
      </Routes>
    </section>
  );
};

export default User;
