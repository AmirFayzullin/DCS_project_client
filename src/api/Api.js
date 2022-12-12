import axios from "axios";

export class Api {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    sendImages = (formData) => {
        return axios({
            url: this._baseUrl + "/uploadImages",
            headers: {
              "WS-ID": this.#getWsId(),
            },
            method: 'post',
            data: formData
        })
    };

    download = async () => {
        return axios({
            url: this._baseUrl + '/download',
            method: 'get',
            responseType: 'blob'
        })
    };

    #getWsId = () => {
        return localStorage.getItem("WS-ID");
    }
}