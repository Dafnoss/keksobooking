'use strict';

(function () {
    var filterForm = document.querySelector('.map__filters');

    var prevTimer;

    filterForm.addEventListener('change', function () {

        window.clearTimeout(prevTimer);

        prevTimer = window.setTimeout( function () {

        var wipePins = function () {
            var container = document.querySelector('.map__pins');
            var oldPins = container.querySelectorAll('button[type="button"]');
            var arrOldPins = Array.from(oldPins);

            arrOldPins.forEach(function (it, i, arr) {
                container.removeChild(it);
            });
        };

        var container = document.querySelector('.map__pins');
        var housingType = document.querySelector('#housing-type').value;
        var housingPrice = document.querySelector('#housing-price').value;
        var housingRooms = document.querySelector('#housing-rooms').value;
        var housingGuests = document.querySelector('#housing-guests').value;
        var housingFeatures = document.querySelector('#housing-features');
        var isWiFi = housingFeatures.querySelector('#filter-wifi').checked;
        var isDishWasher = housingFeatures.querySelector('#filter-dishwasher').checked;
        var isParking = housingFeatures.querySelector('#filter-parking').checked;
        var isWasher = housingFeatures.querySelector('#filter-washer').checked;
        var isElevator = housingFeatures.querySelector('#filter-elevator').checked;
        var isConditioner = housingFeatures.querySelector('#filter-conditioner').checked;


        var data = window.downloads;

        var newData = (function () {
            var newData;
            var dataCopy = data.slice(0);

            newData = dataCopy.filter(function (it, i, array) {
                switch (housingType) {
                    case 'any': return true;
                    case it.offer.type: return it.offer.type;
                    }
            })
                .filter(function (it) {
                    switch (housingPrice) {
                        case 'any' : return true;
                        case 'low' : return it.offer.price <= 10000;
                        case 'middle': return (it.offer.price > 10000 && it.offer.price < 50000);
                        case 'high': return 50000 <= it.offer.price;
                    }
            })
                .filter(function (it) {
                    switch (housingRooms) {
                        case 'any' : return true;
                        case '1': return it.offer.rooms === 1;
                        case '2': return it.offer.rooms === 2;
                        case '3': return it.offer.rooms === 3;
                    }

            })
                .filter(function (it) {
                    switch (housingGuests) {
                        case 'any' : return true;
                        case '1': return it.offer.guests === 1;
                        case '2': return it.offer.guests === 2;
                    }
            })
                .filter(function (it) {
                    if (isWiFi) { return it.offer.features.includes("wifi") }
                    return true;
            })
                .filter(function (it) {
                    if (isDishWasher) { return it.offer.features.includes("dishwasher") }
                    return true;
            })
                .filter(function (it) {
                    if (isParking) { return it.offer.features.includes("parking") }
                    return true;
            })
                .filter(function (it) {
                    if (isWasher) { return it.offer.features.includes("washer") }
                    return true;
            })
                .filter(function (it) {
                    if (isElevator) { return it.offer.features.includes("elevator") }
                    return true;
            })
                .filter(function (it) {
                    if (isConditioner) { return it.offer.features.includes("conditioner") }
                    return true;
            });

            return newData
        })();

        console.dir(newData);

        wipePins ();
        window.createPins(newData); //window.map.pins новые;

        container.appendChild(window.map.pins);
        window.map.renderCards();
        window.card.removeActiveElement();

        var popup = document.querySelector('.popup');
        if (popup) {
            popup.parentNode.removeChild(popup);
        }

    }, 300);

    });

})();