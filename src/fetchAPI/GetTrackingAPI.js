import * as type from "./../constants";
export default function callAPi(param) {
      // console.log(param);

      return new Promise((resolve, reject) => {
            let url = type.GET_TRACKINGMORE_API + param;
            console.log("GetTacking",url);


            fetch(url, {
                  method: "GET",
                  headers: {
                        'Content-Type': 'application/json',
                        'Trackingmore-Api-Key': "febd481b-51b5-4387-96a2-aa1c865e96d4"
                  }
            })
                  .then(response => response.json())
                  .then(res => {
                        // console.log(res);

                        resolve(res);
                  })
                  .catch(err => {
                        reject(err)
                  })
      })
}
