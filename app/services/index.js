import 'whatwg-fetch';

export function makeFullUrl(url) {
  const BASE_HOST = 'http://10.2.201.244:3000';
  if (url.indexOf(BASE_HOST) == -1) {
    url = BASE_HOST + url;
  }
  return url;
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    response.json.bind(response);
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function parseJSON(response) {
  return response.json();
}

function postFetchHandler(res) {
  return new Promise(function (resolve, reject) {
    resolve(res);
  }).then(checkStatus).then(parseJSON).then(function (res) {
    if (res.errorcode && res.errorcode != 0) {
      return {error: res.error};
    } else {
      return {response: res};
    }
  }).catch(function (ex) {
    return {error: ex};
  });
}

function onFailHandler(error) {
  return new Promise(function(resolve, reject) {
    resolve({
      'error': -111,
      'message': error.message
    })
  })
}

// POST
export function jsonPost(url, data) {
  url = makeFullUrl(url);

  console.log('post request | %s | %s', url, JSON.stringify(data));
  return fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(postFetchHandler).catch(onFailHandler);
}

export function search(query) {
  return jsonPost('/api/search', query);
}

export function detail(query) {
  query.cursor = parseInt(query.cursor);
  return jsonPost('/api/detail', query);
}
