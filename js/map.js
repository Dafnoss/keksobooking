'use strict';
// создаем элемент
(function () {

    // создаем массив пинов
    window.map = {};
    window.map.allPins = [];
    window.map.map = document.querySelector(".map");
    window.onError = function (status) {
        console.log('НИФИГА НЕ ЗАГРУЗИЛОСЬ СЕРВЕТ ОТВЕТИЛ ' + status);
    };

    window.onLoad = function (downloadedData) {
        if (downloadedData.length === 0) {
            return window.map.pins = [];
        }

        var template = document.querySelector('template');
        var mapButton = template.content.querySelector('.map__pin');

        window.downloads = downloadedData;

        window.createPins = function (properties) {
            window.map.allPins = [];
            var MAXPINS = 5;

            for (var j = 0; j < properties.length; j++) {
                // var pin = allPins[j];
                var pin = mapButton.cloneNode(true);
                var pinX = properties[j].location.x;
                var pinY = properties[j].location.y;
                pin.style.left = pinX - 100 + 'px';
                pin.style.top = pinY + 'px';
                pin.nameText = properties[j].offer.title;

                var pinImg = pin.querySelector('img');
                pinImg.setAttribute('src', properties[j].author.avatar);
                window.map.allPins[j] = pin;
            }

            //вставляем на страницу
            var fragment = document.createDocumentFragment();

            /*window.map.allPins.forEach(function (val, i, arr) {
                fragment.appendChild(val);
            });*/

            for (var i = 0; i < MAXPINS && window.map.allPins[i]; i++) {
                fragment.appendChild(window.map.allPins[i]);
            };

            var pinContainer = document.querySelector('.map__pins');

            window.map.pins = fragment;
            window.map.renderCards();
        };

        window.createPins(downloadedData);

        document.querySelector('.map__pins').appendChild(window.map.pins);
    };

    //window.backend.download(window.onLoad, window.onError);
})();