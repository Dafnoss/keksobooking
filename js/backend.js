'use strict';

(function () {
    window.createXhrRequest = function (method, url, onLoad, onError, data) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            console.log(xhr.status);
            switch (xhr.status) {
                case 200:
                    onLoad(xhr.response);
                    break;

                default:
                    onError(xhr.status);
                    break;
            }
        });

        xhr.open(method, url);
        xhr.send(data);
        console.log(xhr.status)
    };
})();