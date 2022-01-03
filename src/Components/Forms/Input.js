import React from "react";
import styles from "./Input.module.css";

/* Colocamos o name para quando clicarmos no Usuário ou senha ele já selecionar o campo, apos feita a desestruturação de username no input, isso nos dá um acesso ao value onchange error onblur configurado no useForm 
-- quando eu clicar eu quero que seja feita a validação então passamos o onBlur dentro do input tbm para executar a validação após o clique 
*/
const Input = ({ label, type, name, value, onChange, error, onBlur }) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
    /*nesta verificação acima, verificamos que se caso exista um erro no primeiro momento e depois de verificado a existência dele, passamos a parte da mensagem de erro */
  );
};

export default Input;
