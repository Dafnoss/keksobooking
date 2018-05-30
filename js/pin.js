'use strict';

(function () {
    var mainPin = document.querySelector('.map__pin--main');
    var adForm = document.querySelector('.ad-form');
    var container = document.querySelector('.map__pins');

    mainPin.addEventListener('mousedown', function (evt) {
        var status = adForm.classList.contains('ad-form--disabled')

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

                mainPin.style.top = evtMove.pageY - shift.y + 'px';
                mainPin.style.left = evtMove.clientX - shift.x + 'px';

            };

            document.addEventListener('mousemove', moveFunction);

            mainPin.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', moveFunction);
                window.map.map.classList.remove('map--faded');
                container.appendChild(window.map.pins);
                adForm.classList.remove('ad-form--disabled');
            });
        };

    });

})();