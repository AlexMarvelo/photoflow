// import jsonp from 'jsonp';

export default function(url, params = {}) {
  return fetch(url, params)
    .then((response) => response.text())
    .then(JSON.parse)
    .then(data => {
      // console.log(data);
      return data;
    })
    .catch(err => {
      // console.error(err);
      throw err;
    });
}
