async function PostData(type, userData) {
    //let BaseURL = 'http://localhost:3000/';
    let BaseURL = 'https://buy-zabor.ew.r.appspot.com/';
  
    return new Promise((resolve, reject) =>{
        const headers = new Headers({
            'Content-Type': 'application/json', //вот из-за этой залупы почему-то не работал корс хотя ориджин на сервере стоит в списке разрешенных хз
        })
        fetch(BaseURL+type, {
            //mode:'cors',
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userData)
            //body: userData
          })
          .then((response) => response.json())
          .then((res) => {
            resolve(res);
          }) 
          .catch((error) => {
            reject(error);
          });
      }).catch((error) => {
        reject(error);
        console.log(error);
      });
}

export {PostData}