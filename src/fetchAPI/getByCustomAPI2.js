
export default function callAPi(param) {


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