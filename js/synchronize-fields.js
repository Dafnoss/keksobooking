(function () {

    window.synchronizeFields = function (objFirst, objSecond, val1Selects, val2Selects, syncValues) {
        objFirst.addEventListener('change', function () {
            syncValues(objSecond, objFirst.value);
        });

        objSecond.addEventListener('change', function () {
            syncValues(objFirst, objSecond.value);
        });
    };

})();