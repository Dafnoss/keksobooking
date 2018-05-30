'use strict';
// создаем элемент
(function () {

    var template = document.querySelector('template');
    var mapButton = template.content.querySelector('.map__pin');

    // создаем массив пинов
    window.map = {}
    window.map.allPins = [];
    window.map.map = document.querySelector(".map");

    for (var j = 0; j < window.data.properties.length; j++) {
        // var pin = allPins[j];
        var pin = mapButton.cloneNode(true);
        var pinX = window.data.properties[j].location.x - 50;
        var pinY = window.data.properties[j].location.y + 70;
        pin.style.left = pinX+'px';
        pin.style.top = pinY+'px';

        var pinImg = pin.querySelector('img');
        pinImg.setAttribute('src', window.data.properties[j].author.avatar);
        window.map.allPins[j] = pin;
    }

    //вставляем на страницу
    var fragment = document.createDocumentFragment();

    window.map.allPins.forEach(function (val, i, arr) {
        fragment.appendChild(val);
    });

    var pinContainer = document.querySelector('.map__pins');

    window.map.pins = fragment;
})();