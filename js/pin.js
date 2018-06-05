'use strict';

(function () {
    var mainPin = document.querySelector('.map__pin--main');
    var adForm = document.querySelector('.ad-form');
    var container = document.querySelector('.map__pins');
    var address = document.querySelector('#address');
    var cords = {};

    mainPin.addEventListener('mousedown', function (evt) {
        var status = 1;//adForm.classList.contains('ad-form--disabled')

        if (status) {

            evt.preventDefault();

            var startCords = {
                x: evt.clientX,
                y: evt.clientY
            };

            var moveFunction = function (evtMove) {
                evt.preventDefault();

                var startCords = {
                    x: evt.clientX,
                    y: evt.clientY
                };

                var shift = {
                    x: function () {
                        var num = 30;
                        if (window.innerWidth > 1200) {
                            num = (window.innerWidth - 1200)/2 + 30;
                        }
                        return num;
                    }(),

                    y: 20

                };

                //mainPin.style.top = evtMove.pageY - shift.y + 'px';
                (evtMove.pageY < 100) ? mainPin.style.top = '100px' :
                (evtMove.pageY > 600) ? mainPin.style.top = '600px' :
                mainPin.style.top = evtMove.pageY - shift.y + 'px';
                mainPin.style.left = evtMove.clientX - shift.x + 'px';
                cords = {
                    x: evtMove.clientX - shift.x,
                    y: evtMove.pageY - shift.y
                };

            };

            document.addEventListener('mousemove', moveFunction);

            mainPin.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', moveFunction);
                window.map.map.classList.remove('map--faded');
                address.setAttribute('value', cords.x + ', ' + cords.y);
                container.appendChild(window.map.pins);
                adForm.classList.remove('ad-form--disabled');
            });
        };

    });

})();