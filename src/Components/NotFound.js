import React from "react";

const NotFound = () => {
  //Criamos uma página para expressar a mensagem do Error 404 e colocamos a sua rota no app no User e no login para que caso a pessoa procure uma rota que não está definida, apareça o error 404
  return (
    <div className="container mainContainer">
      <h1 className="title"> Error: 404</h1>
      <p>Page not found.</p>
    </div>
  );
};

export default NotFound;
