import React from "react";
import { useParams } from "react-router-dom";
import Feed from "../Feed/Feed";
import Head from "../Helper/Head";


// puxamos a propriedade de user e usamos o useparams, o use params é um hook que puxa o que eu preciso da url definida pela minha API
const UserProfile = () => {
  const { user } = useParams();

  
  return (
    <section className="container mainSection">
      <Head title ={user}/>
      <h1 className="title">{user}</h1>
      <Feed user={user} />
    </section>
  );
};

export default UserProfile;
