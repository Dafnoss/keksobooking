'use strict';
// создаем элемент
(function () {

    var template = document.querySelector('template');
    var mapButton = template.content.querySelector('.map__pin');

    // создаем массив пинов
    window.map = {};
    window.map.allPins = [];
    window.map.map = document.querySelector(".map");
    var onError = function (status) {
        console.log('НИФИГА НЕ ЗАГРУЗИЛОСЬ СЕРВЕТ ОТВЕТИЛ ' + status);
    };

    var onLoad = function (properties) {
        window.downloads = properties;
        for (var j = 0; j < properties.length; j++) {
            // var pin = allPins[j];
            var pin = mapButton.cloneNode(true);
            var pinX = properties[j].location.x;
            var pinY = properties[j].location.y;
            pin.style.left = pinX + 'px';
            pin.style.top = pinY + 'px';

            var pinImg = pin.querySelector('img');
            pinImg.setAttribute('src', properties[j].author.avatar);
            window.map.allPins[j] = pin;
        }

        //вставляем на страницу
        var fragment = document.createDocumentFragment();

        window.map.allPins.forEach(function (val, i, arr) {
            fragment.appendChild(val);
        });

        var pinContainer = document.querySelector('.map__pins');

        window.map.pins = fragment;
        window.map.renderCards();
    };

    window.backend.download(onLoad, onError);
})();