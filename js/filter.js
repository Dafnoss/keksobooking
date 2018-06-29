'use strict';

(function () {
    var filterForm = document.querySelector('.map__filters');

    var prevTimer;

    filterForm.addEventListener('change', function () {

        window.clearTimeout(prevTimer);

        prevTimer = window.setTimeout(function () {

            var wipePins = function () {
                var container = document.querySelector('.map__pins');
                var oldPins = container.querySelectorAll('button[type="button"]');
                var arrOldPins = Array.from(oldPins);

                arrOldPins.forEach(function (it, i, arr) {
                    container.removeChild(it);
                });
            };

            var container = document.querySelector('.map__pins');
            var housingFeatures = document.querySelector('#housing-features');
            var MAX = 5;

            var filterSettings = {
                'housingType': document.querySelector('#housing-type').value,
                'housingPrice': document.querySelector('#housing-price').value,
                'housingRooms': document.querySelector('#housing-rooms').value,
                'housingGuests': document.querySelector('#housing-guests').value,
                'housingFeatures': document.querySelector('#housing-features'),
                'isWiFi': housingFeatures.querySelector('#filter-wifi').checked,
                'isDishWasher': housingFeatures.querySelector('#filter-dishwasher').checked,
                'isParking': housingFeatures.querySelector('#filter-parking').checked,
                'isWasher': housingFeatures.querySelector('#filter-washer').checked,
                'isElevator': housingFeatures.querySelector('#filter-elevator').checked,
                'isConditioner': housingFeatures.querySelector('#filter-conditioner').checked
            };

            console.dir(filterSettings);


            var data = window.downloads;

            var newData = (function () {

                var dataCopy = data.slice(0);
                var newNewData = [];

                // маприруем ценник
                dataCopy.map(function (value) {
                    value.offer.priceRange = 'any';

                    if (value.offer.price <= 10000) {
                        value.offer.priceRange = 'low';
                    }
                    if (value.offer.price > 10000 && value.offer.price < 50000) {
                        value.offer.priceRange = 'middle';
                    }
                    if (50000 <= value.offer.price) {
                        value.offer.priceRange = 'high'
                    }

                    if (value.offer.rooms > 3) {
                        value.offer.rooms = 'any';
                    }

                    if (value.offer.guests > 2) {
                        value.offer.guests = 'any';
                    }

                });

                for (var j = 0; newNewData.length <= MAX; j++) {
                    var value = dataCopy[j];

                    if (!value) {
                        break;
                    }

                    if (value.offer.type !== filterSettings['housingType'] && filterSettings['housingType'] !== 'any') {
                        continue;
                    }

                    if (value.offer.priceRange !== filterSettings['housingPrice'] && filterSettings['housingPrice'] !== 'any') {
                        continue;
                    }

                    if (value.offer.rooms.toString() !== filterSettings['housingRooms'] && filterSettings['housingRooms'] !== 'any') {
                        continue;
                    }

                    if (value.offer.guests.toString() !== filterSettings['housingGuests'] && filterSettings['housingGuests'] !== 'any') {
                        continue;
                    }

                    var funcCheck = function (inObject, inFilter) {
                        return value.offer.features.includes(inObject) !== filterSettings[inFilter] && filterSettings[inFilter] !== false
                    };

                    if (funcCheck('wifi', 'isWiFi')) {
                        continue;
                    }

                    if (funcCheck('dishwasher', 'isDishWasher')) {
                        continue;
                    }

                    if (funcCheck('parking', 'isParking')) {
                        continue;
                    }

                    if (funcCheck('washer', 'isWasher')) {
                        continue;
                    }

                    if (funcCheck('elevator', 'isElevator')) {
                        continue;
                    }

                    if (funcCheck('elevator', 'isWasher')) {
                        continue;
                    }

                    if (funcCheck('conditioner', 'isConditioner')) {
                        continue;
                    }

                    newNewData.push(value);
                };

                return newNewData
            })();

            console.dir(newData);

            wipePins();
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