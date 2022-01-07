//para não precisarmos ficar escrevendo a api toda hora, separamos a parte do fetch( ass opções e o url) e que vou teer acesso a todos os endpoints do meu app
// nesse primeiro momento passamos a base do api
export const API_URL = "https://dogsapi.origamid.dev/json";
//No token post pegamos o token gerado para autenticar o usuário que está logando
//pra pegar o token precisa do nome do usuario e a senha que vai gerar uma string e salvamos no localstorage
export function TOKEN_POST(body) {
  return {
    url: API_URL + "/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
// endpoint para validar o token
export function TOKEN_VALIDATE_POST(token) {
  return {
    url: API_URL + "/jwt-auth/v1/token/validate",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}

// a url para pegar o usuario e api/user e utilizamos o metodo GET e no headers passamos o token dentro da autorization, ESSA É A FUNÇÃO PARA PEGAR O USUÁRIO
export function USER_GET(token) {
  return {
    url: API_URL + "/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  };
}
//endpoint de postar o usuário, ele recebe o body e continua dentro de api/user e passado o tipo de contéudo que é application/json, vamos passar no corpo que precisa de usuário email e senha e depois no body: json.stringify(body) o body vai ser transformado em string
export function USER_POST(body) {
  return {
    url: API_URL + "/api/user",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
//endpoint para postar a foto, passo o token, pois é preciso autorização, é preciso ser um usuário para fazer a postagem da foto e também é necessário o formData que contém os dados passados no Formulário para inserir no post
export function PHOTO_POST(formData, token) {
  return {
    url: API_URL + "/api/photo",
    options: {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    },
  };
}

//neste vamos ter 3 items que vamos passar sempre, que será a página que eu quero puxar, o total de itens que eu quero pegar e de qual usuário vamos pegar, para tirar o cache, definimos como 'no-store' porque se ele coloca em cache e o usuário posta uma foto nova, essa foto nova não irá aparecer.
//passamos na nossa url items que foram definidos na API, passamos página total e usuário
export function PHOTOS_GET({ page, total, user }) {
  return {
    url: `${API_URL}/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  };
}

//nesse caso, vamos puxar a foto por id para apresentar ela em destaque com os comentários
export function PHOTO_GET(id) {
  return {
    url: `${API_URL}/api/photo/${id}`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  };
}
//aqui definimos a api e ditamos que ela receba o id e o corpo utilizando o metodo post e temos que indicar que ele é content type, do tipo jason e também precisa está autorizada para postar, definimos o token diferente nesse caso apenas para utilizar como exemplo
export function COMMENT_POST(id, body) {
  return {
    url: `${API_URL}/api/comment/${id}`,
    options: {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    },
  };
}
// com esse endpoint com o metódo delete, eu também faço uma verificação para ver se a pessoa tem autorização
export function PHOTO_DELETE(id) {
  return {
    url: `${API_URL}/api/photo/${id}`,
    options: {
      method: "DELETE",

      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    },
  };
}

export function PASSWORD_LOST(body) {
  return {
    url: API_URL + "/api/password/lost",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}

export function PASSWORD_RESET(body) {
  return {
    url: API_URL + "/api/password/reset",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  };
}
