'use strict';

(function () {

    var form = document.querySelector('.ad-form');

    //Синхронизируем поля чекина и чекаута
    var checkInBox = form.querySelector('#timein');
    var checkOutBox = form.querySelector('#timeout');

    checkInBox.addEventListener('change', function () {
        checkOutBox.value = checkInBox.value;
    });

    checkOutBox.addEventListener('change', function () {
        checkInBox.value = checkOutBox.value;
    });

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
        };
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
                capacitySel.innerHTML='';
                capacitySel.appendChild(oneGuest);
                break;
            case '2':
                capacitySel.innerHTML='';
                capacitySel.appendChild(oneGuest);
                capacitySel.appendChild(twoGuest);
                break;
            case '3':
                capacitySel.innerHTML='';
                capacitySel.appendChild(oneGuest);
                capacitySel.appendChild(twoGuest);
                capacitySel.appendChild(treeGuest);
                break;
            case '100':
                capacitySel.innerHTML='';
                capacitySel.appendChild(noGuest);
                break;
        }
    });

})();