import * as type from "./../constants";

export default function deleteItemProperties(param) {  
    return new Promise((resolve, reject) => {        
        let url =type.FETCH_URL_ITEMS+param.item_post.id;
        console.log("Delete",url);

       fetch(url, {
           method: "DELETE"
       })
           .then(response => response.json())
           .then(res => {
               resolve(res);
           })
           .catch(err => {
               reject(err)
           })
       })
}