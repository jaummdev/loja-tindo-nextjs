import axios from "axios";

export const apiTindo = axios.create({
    baseURL: 'https://api.tindo.com.br/ecommerce',
    headers: {
        "tindo-id": 273,
        "tindo-ref": "UHJHGV",
        "access-token": "9da774123d48d1bc223d4eaa6f82920b",
        "client-request": "VENDA_ONLINE",
    },

})