import axios from "axios";
export class Api {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    #checkResponse = (res) => {
        if (res.status < 200 || res.status > 299) return Promise.reject(res);
        return res.data;
    };

    sendImages = (formData) => {
        return axios({
            url: this._baseUrl + "uploadImages",
            headers: {
              "WS-ID": this.#getWsId(),
            },
            method: 'post',
            data: formData
        })
            .then(this.#checkResponse)
    };

    download = async () => {
        return axios({
            url: this._baseUrl + 'download',
            method: 'get',
            responseType: 'blob'
        })
            .then(this.#checkResponse)
    };

    register = (userData) => {
        return axios({
            url: this._baseUrl + 'register',
            method: 'post',
            data: userData
        })
            .then(this.#checkResponse)
    };

    login = (userData) => {
        return axios({
            url: this._baseUrl + 'login',
            method: 'post',
            data: userData
        })
            .then(this.#checkResponse)
    };

    me = (token) => {
        return axios({
            url: this._baseUrl + 'me',
            method: 'get',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this.#checkResponse)
    };

    #getWsId = () => {
        return localStorage.getItem("WS-ID");
    }
}