'use strict';

(function () {

    var form = document.querySelector('.ad-form');

    //Синхронизируем поля чекина и чекаута
    var checkinTime = document.querySelector('#timein');
    var checkoutTime = document.querySelector('#timeout');

    var syncValues = function (element, value) {
        element.value = value;
    };

    window.synchronizeFields(checkinTime, checkoutTime, ['12', '13', '14'], ['12', '13', '14'], syncValues);

    //синхронихируем поля типа жилья и min цены
    var typeOfHouse = form.querySelector('#type');
    var minPrice = form.querySelector('#price');

    typeOfHouse.addEventListener('change', function () {
        switch (typeOfHouse.value) {
            case 'flat':
                minPrice.setAttribute('min', '0');
                break;
            case 'bungalo':
                minPrice.setAttribute('min', '1000');
                break;
            case 'house':
                minPrice.setAttribute('min', '5000');
                break;
            case 'palace':
                minPrice.setAttribute('min', '10000');
                break;
        }
        ;
    });

    //сихронизируем варианты
    var roomNumber = form.querySelector('#room_number');
    var capacitySel = form.querySelector('#capacity');

    var oneGuest = capacitySel.removeChild(capacitySel.querySelector('[value="1"]'));
    var twoGuest = capacitySel.removeChild(capacitySel.querySelector('[value="2"]'));
    var treeGuest = capacitySel.removeChild(capacitySel.querySelector('[value="3"]'));
    var noGuest = capacitySel.removeChild(capacitySel.querySelector('[value="0"]'));

    capacitySel.appendChild(oneGuest);

    roomNumber.addEventListener('change', function () {
        switch (roomNumber.value) {
            case '1':
                capacitySel.innerHTML = '';
                capacitySel.appendChild(oneGuest);
                break;
            case '2':
                capacitySel.innerHTML = '';
                capacitySel.appendChild(oneGuest);
                capacitySel.appendChild(twoGuest);
                break;
            case '3':
                capacitySel.innerHTML = '';
                capacitySel.appendChild(oneGuest);
                capacitySel.appendChild(twoGuest);
                capacitySel.appendChild(treeGuest);
                break;
            case '100':
                capacitySel.innerHTML = '';
                capacitySel.appendChild(noGuest);
                break;
        }
    });

//Мутим кнопку сброса формы
    var clearBtn = form.querySelector('.ad-form__reset');
    var clearForm = function (evt) {
        if (evt) {
        evt.preventDefault();
    }
        form.reset();

        //резет фотографий
        document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
        var photoContainer = document.querySelector('.ad-form__photo-container');
        var photos = document.querySelectorAll('.ad-form__photo');
        var pasteNode = document.querySelector('.ad-form__photo').cloneNode();

        var photosArr = Array.from(photos);
        photosArr.forEach(function (val, i, arr) {
            photoContainer.removeChild(val);
        });

        photoContainer.appendChild(pasteNode);

    };

    clearBtn.addEventListener('click', clearForm);

//Отправляем форму
    form.addEventListener('submit', function (evt) {
        evt.preventDefault();

        var onLoad = function (successMessage) {
            console.log(successMessage);

            //сбросс вселенной
            var resetEverything = function () {
            clearForm();
            window.loadStatus = 0;
            form.classList.add('ad-form--disabled');
            window.map.map.classList.add('map--faded');
            window.removePins();
            document.querySelector('.map__pin--main').setAttribute('style', 'left: 570px; top: 375px');
            }();
        };

        var onError = function (errorMessage) {
            var node = document.createElement('div');
            node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red';
            node.style.left = 0;
            node.style.top = 0;
            node.style.fontSize = '30px';

            node.textContent = errorMessage;

            document.form.insertAdjacentElement('afterbegin', node);
        };

        window.createXhrRequest('POST', 'https://js.dump.academy/keksobooking', onLoad, onError, new FormData(form));
    })

})();