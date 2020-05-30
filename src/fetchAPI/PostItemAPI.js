

import * as type from "./../constants";
export default function postItemExcel(param) {
    //   console.log(param);
      
      return new Promise((resolve, reject) => {
          const url =type.FETCH_URL_ITEMS;
          // console.log("Post",url);
          fetch(url, {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
            body: JSON.stringify(param )
 
          })
              .then(response => response.json())
              .then(res => {
                  resolve(res);
              })
              .catch(err => {
                //   console.log(err);
                  
                  reject(err)
              })
      })
  }