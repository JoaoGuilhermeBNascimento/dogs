import React from "react";

const PhotoPost = () => {
  const [token, setToken] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [token, setToken] = React.useState("");
  const [token, setToken] = React.useState("");
  const [token, setToken] = React.useState("");
  const [token, setToken] = React.useState("");

  

  function handleSubmit(event) {
    event.preventDefault();

    fetch("https://dogsapi.origamid.dev/json/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        console.log(json);
        return json;
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <input
        type="text"
        placeholder="email"
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />

      <button>Enviar</button>
    </form>
  );
};
export default PhotoPost;
