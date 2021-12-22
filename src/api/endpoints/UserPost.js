import React from "react";

const UserPost = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }
  return;
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={username}
      placeholder="username"
      onChange={({ target }) => setUsername(target.value)}
    />
    <input
      type="text"
      value={email}
      placeholder="email"
      onChange={({ target }) => setEmail(target.value)}
    />
    <input
      type="text"
      value={password}
      placeholder="password"
      onChange={({ target }) => setPassword(target.value)}
    />

    <button>Enviar</button>
  </form>;
};

export default UserPost;
