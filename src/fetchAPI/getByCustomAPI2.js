import * as type from "../constants";
export default function callAPi(param) {
console.log(param);

    return new Promise((resolve, reject) => {


        fetch(param, { method: "GET" })
            .then(response => response.json())
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err)
            })
    })
}