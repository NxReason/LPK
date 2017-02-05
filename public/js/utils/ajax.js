const ajax = (function() {
  function setXHRHeaders(xhr, headers) {
    for (let header in headers) {
      xhr.setRequestHeader(header, headers[headers]);
    }
  }

  return function(path = '', options = {}) {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method || 'GET', path, true);
    if (options.headers) { setXHRHeaders(xhr, options.headers); }
    xhr.send(options.data);

    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
          if(xhr.status == 200) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.statusText);
          }
        }
      }
    })
  }
})();
