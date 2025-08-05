import axios from "axios";

// Deixando o codigo mais limpo e facilitado na troca da porta caso haja mudancas.
const apiPorta = "5289";

//apiLocal ela recebe o endereco da api.
const apiLocal = `http://localhost:${apiPorta}/api/`

const apiAzure = "https://apieventkaue-dvebe3gch6fgbwdj.canadacentral-01.azurewebsites.net/api/";

//Criamos um acesso que vai ter a base nossa api.
const api = axios.create({
    baseURL: apiAzure
});

export default api;