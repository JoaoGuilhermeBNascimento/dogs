import React from "react";
// nesse objetos types vai conter todos os itens que são validados e recebem um regex para definir um padrão para o campo e a message seria  a mensagem de retorno de erro
const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      "A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito.Com no mínimo 8 caracteres ",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize  números apenas",
  },
};
//primeiro setamos o valor e o setValue, no return iremos return todos os objetos que iremos utilizar
//função onChange que é a função que o formulário utiliza para modificar o estado dele, passamos o evento que é o target desestruturados e seta o value como setValue(target.value)
// No useForm ele recebe o tipo de formulário que é, que chamamos dee type
const useForm = (type) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);
  //no validade nos recebemos o valor que estamos validando ou não, a primeira coisa que fazemos é verificar se o tipo(type) foi definido ou não e colocamos que se type for falso ou não, depois verifica se tem alguma há alguma coisa no valor, se for igual a 0 significa que a pessoa clicou e não digitou nada e então retornamos a mensagem de erro.
  // se a função const password = useForm(); localizada em LoginForm ,tiver falso ele não faz a validação. Utiliza-se esse método para quando não quisermos validar
  function validate(value) {
    if (type === false) return true;
    // validação com value.lenght ===0 é para verificar se pessoa clicou e não digitou nada e depois definimos um setError para isso
    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;
      // se não ocorrer o erro de cima, passamos para a validação do tipo, para verificar se é do tipo email ou outra coisa
      // se existir o types[type] que pode ser o email por exemplo, a exclamação valida como se o valor for falso, isso significa que não passou no regex criado e então definimos um erro conforme o type
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      //retorna false porque houve problema na validação e irá aparecer a mensagem do setError conforme o type
      return false;
      // nesse caso abaixo, é que não houve nenhum erro, então setamos o setErrorcomo nulo pois não há erro, a validação foi verdadeira retornando true
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    // toda vez que eu tiver o onchange, vai ser validado o target.value, mas só vai ser validado se tiver um erro inicial, pois se não quando eu começar a digitar já aparece uma mensagem de erro
    if (error) validate(target.value);
    setValue(target.value);
  }
  //o validate é exportado como um metodo que vai ativar o validate e vai verificar o valor
  // temos o mesmo sentido de validação, porque eu quero validar quando o usuário clica no campo de formulario e sai
  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
