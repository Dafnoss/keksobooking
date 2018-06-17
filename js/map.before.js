// Модуль испрользовался для создания рандомных обьектов


// Создаем массив из 8 ми обьектов
var getRandomInt = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
};

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

    var avatarNum = getRandomInt(0, avatars.length - 1);
    var titleNum = getRandomInt(0, titles.length - 1);

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
            "rooms": getRandomInt(1, 5),
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

// создаем элемент

var template = document.querySelector('template');
var mapButton = template.content.querySelector('.map__pin');

// создаем массив пинов

var allPins = [];

for (var j = 0; j < properties.length; j++) {
    // var pin = allPins[j];
    var pin = mapButton.cloneNode(true);
    var pinX = properties[j].location.x - 50;
    var pinY = properties[j].location.y + 70;
    pin.style.left = pinX + 'px';
    pin.style.top = pinY + 'px';

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

//Убираем класс и всталяем пины

var mainPin = document.querySelector('.map__pin--main');
var map = document.querySelector(".map");
var adForm = document.querySelector('.ad-form');

mainPin.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    pinContainer.appendChild(fragment);
    adForm.classList.remove('ad-form--disabled');
});


//создаем карточку
var mapCard = template.content.querySelector('.map__card').cloneNode(true);
var mapCardTitle = mapCard.querySelector('.popup__title');
var mapCardAddress = mapCard.querySelector('.popup__text--address');
var mapCardPrice = mapCard.querySelector('.popup__text--price');
var mapCardType = mapCard.querySelector('.popup__type');
var mapCardCapacity = mapCard.querySelector('.popup__text--capacity');
var mapCardTime = mapCard.querySelector('.popup__text--time');
var mapCardFeatures = mapCard.querySelector('.popup__features');
var mapCardDescription = mapCard.querySelector('.popup__description');
var mapCardAvatar = mapCard.querySelector('.popup__avatar');


function fillTheCard(object) {
    mapCardTitle.textContent = object.offer.title;
    mapCardAddress.textContent = object.offer.address;
    mapCardPrice.innerHTML = object.offer.price + '&#8381' + '/ночь';
    mapCardType.textContent = 'Квартира'
    if (object.offer.type == 'bungalo') {
        mapCardType.textContent = 'Бунгало'
    } else if (object.offer.type == 'house') {
        mapCardType.textContent = 'Дом'
    }
    mapCardCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    if (object.offer.rooms == 5) {
        mapCardCapacity.textContent = object.offer.rooms + ' комнат для ' + object.offer.guests + ' гостей';
    }
    mapCardTime.textContent = 'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;
    var mapCardNewFeatures = document.createDocumentFragment();
    object.offer.features.forEach(function (val, index, array) {
        var element = document.createElement('li');
        element.classList.add('popup__feature');
        element.classList.add('popup__feature--' + val);
        mapCardNewFeatures.appendChild(element);
    })
    mapCardFeatures.innerHTML = '';
    mapCardFeatures.appendChild(mapCardNewFeatures);
    mapCardDescription.textContent = object.offer.description;
    mapCardAvatar.setAttribute('src', object.author.avatar);


}

//fillTheCard(properties[0]);

//вставляем на страницу
//map.appendChild(mapCard);


//активация маппина и открытие карточки
var removeActiveElement = function () {
    var activeElement = pinContainer.querySelector('.map__pin--active');
    if (activeElement) {
        activeElement.classList.remove('map__pin--active');
    }
    ;
};

allPins.forEach(function (val, i, arr) {
    val.addEventListener('click', function (evt) {
        var getPicPath = function () {
            if (evt.target.tagName == 'IMG') {
                var picPath = evt.target.attributes[0].nodeValue;
            } else {
                var picPath = evt.target.firstElementChild.attributes[0].nodeValue;
            }
            return picPath;
        };
        var picPath = getPicPath();
        var pressedObject;

        properties.forEach(function (val, i, arr) {
            if (val.author.avatar == picPath) {
                pressedObject = val;
            }
            ;
        });

        removeActiveElement();

        this.classList.add('map__pin--active');
        fillTheCard(pressedObject);
        map.appendChild(mapCard);
    })
});

//закрытие карточки
var mapCardBtnClose = mapCard.querySelector('.popup__close');
mapCardBtnClose.addEventListener('click', function () {
    map.removeChild(mapCard);
    removeActiveElement();

});

