import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login/Login";
import { UserStorage } from "./UserContext";
import User from "./Components/User/User";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import Photo from "./Components/Photo/Photo";
import UserProfile from "./Components/User/UserProfile";
// Quando temos uma rota que tem sub-rotas, temos que colocar /* explicando que dentro do /login terão outras rotas
//vamos envolver todo nosso app no UserStorage, então a partir do browserRouter envolvemos ele
// passamos informação para baixo de userstorage definindo um valor no usercontext.provider
//  passamos a rota da foto id e do perfil do usuário

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="foto/:id" element={<Photo />} />
            <Route path="perfil/:user" element={<UserProfile />} />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
