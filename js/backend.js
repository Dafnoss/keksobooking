'use strict';

(function () {
    window.backend = {
        download: function (onLoad, onError) {
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

            xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
            xhr.send();
            console.log(xhr.status)
        },

        upload: function (data, onLoad, onError) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';

            xhr.addEventListener('load', function () {
                switch (xhr.status) {
                    case 200:
                        onLoad(xhr.response);
                        break;

                    default:
                        onError(xhr.status);
                        break;
                }
            });

            xhr.open('POST', 'https://js.dump.academy/keksobooking');
            xhr.send(data);
        }
    }
})();