'use strict';

(function () {
    //создаем карточку
        var template = document.querySelector('template');
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
            var activeElement = document.querySelector('.map__pin--active');
            if (activeElement) {
                activeElement.classList.remove('map__pin--active');
            };
        };

        window.map.renderCards = function () {

        window.map.allPins.forEach(function (val, i, arr) {
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

                window.downloads.forEach(function (val, i, arr) {
                    if (val.author.avatar == picPath) {
                        pressedObject = val;
                    };
                });

                removeActiveElement();

                this.classList.add('map__pin--active');
                fillTheCard(pressedObject);
                window.map.map.appendChild(mapCard);
            })
        });

        };

    //закрытие карточки
        var mapCardBtnClose = mapCard.querySelector('.popup__close');
        mapCardBtnClose.addEventListener('click', function () {
            window.map.map.removeChild(mapCard);
            removeActiveElement();

        });
})();