// Создаем массив из 8 ми обьектов

var getRandomInt = function (min, max) {
    return Math.ceil(Math.random() * (max - min)) + min;
};

var properties = [];

var avatars = [];
for (var i = 0; i < 8; i++) {
    avatars[i] = "img/avatars/user0"+(i+1)+".png"
};

var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];

var types = ["flat", "house", "bungalo"];

var featuresOpt = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

var times = ["12:00", "13:00", "14:00"]

var createProperty = function () {

var avatarNum = getRandomInt(0,avatars.length - 1);
var titleNum = getRandomInt(0,titles.length - 1);

var property = {
    "author": {
        "avatar": avatars[avatarNum]
        },
    "offer": {
        "title": titles[titleNum],
        "address": "{{location.x}}, {{location.y}}",
        "price": getRandomInt(100, 1000000),
        "type": types[getRandomInt(0, 2)],
        "guests": getRandomInt(1, 10),
        "checkin": times[getRandomInt(0, 2)],
        "checkout": times[getRandomInt(0, 2)],
        "features": [],
        "description": " ",
        "photos": []
    },
    "location": {
        "x": getRandomInt(300, 900),
        "y": getRandomInt(100, 500)
    },
    "fillFeatures": function () {
        var arr = [];
        for (var i = 0; i <= getRandomInt(1, featuresOpt.length); i++) {
            arr[i] = featuresOpt[i];
        } return arr;
    }
};

property.offer.features = property.fillFeatures();
avatars.splice(avatarNum, 1);
titles.splice(titleNum, 1);

return property;
};

for (var i = 0; i < 8; i++) {
    properties[i] = createProperty();
};


//Убираем класс

var map = document.querySelector(".map");
map.classList.remove('map--faded');

// создаем элемент

var template = document.querySelector('template');
var mapButton = template.content.querySelector('.map__pin');

// создаем массив пинов

var allPins = [];

for (var j = 0; j < properties.length; j++) {
    var pin = allPins[j];
    var pin = mapButton.cloneNode(true);
    var pinX = properties[j].location.x - 50;
    var pinY = properties[j].location.y + 70;
    pin.style.left = pinX+'px';
    pin.style.top = pinY+'px';

    var pinImg = pin.querySelector('img');
    pinImg.setAttribute('src', properties[j].author.avatar);
    allPins[j] = pin;
}

//вставляем на страницу
var fragment = document.createDocumentFragment();

allPins.forEach(function (val, i, arr) {
    fragment.appendChild(val);
});

var pinContainer = document.querySelector('.map__pins');
pinContainer.appendChild(fragment);

