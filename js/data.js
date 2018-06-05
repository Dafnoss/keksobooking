'use strict';
// Создаем массив из 8 ми обьектов
//МОДУЛЬ НЕ ПОДКЛЮЧЕН

(function () {
    window.data = {};
    var mes = 'НИФИГА НЕ ЗАГРУЗИЛОСЬ';
    var onLoad = function (pins) {
        window.data.properties = pins;
    };

    var onError = function (status) {
        console.log('НИФИГА НЕ ЗАГРУЗИЛОСЬ СЕРВЕТ ОТВЕТИЛ ' + status);
    };

    window.backend.download(onLoad, onError);
        /*
            function () {
            var properties = [];
            var avatars = [];
            for (var i = 0; i < 8; i++) {
                avatars[i] = "img/avatars/user0" + (i + 1) + ".png"
            }
            ;

            var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

            var types = ["flat", "house", "bungalo"];

            var featuresOpt = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

            var times = ["12:00", "13:00", "14:00"];

            var createProperty = function () {

                var avatarNum = window.getRandomInt(0, avatars.length - 1);
                var titleNum = window.getRandomInt(0, titles.length - 1);

                var property = {
                    "author": {
                        "avatar": avatars[avatarNum]
                    },
                    "offer": {
                        "title": titles[titleNum],
                        "address": "{{location.x}}, {{location.y}}",
                        "price": window.getRandomInt(100, 1000000),
                        "type": types[window.getRandomInt(0, 2)],
                        "guests": window.getRandomInt(1, 10),
                        "checkin": times[window.getRandomInt(0, 2)],
                        "checkout": times[window.getRandomInt(0, 2)],
                        "features": [],
                        "rooms": window.getRandomInt(1, 5),
                        "description": " ",
                        "photos": []
                    },
                    "location": {
                        "x": window.getRandomInt(300, 900),
                        "y": window.getRandomInt(100, 500)
                    },
                    "fillFeatures": function () {
                        var arr = [];
                        for (var i = 0; i <= window.getRandomInt(1, featuresOpt.length); i++) {
                            arr[i] = featuresOpt[i];
                        }
                        return arr;
                    }
                };

                property.offer.features = property.fillFeatures();
                property.offer.address = property.location.x + ', ' + property.location.y;
                avatars.splice(avatarNum, 1);
                titles.splice(titleNum, 1);

                return property;
            };

            for (var i = 0; i < 8; i++) {
                properties[i] = createProperty();
            }
            ;

            return properties;
        }()
        */
})();