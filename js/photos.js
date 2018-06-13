'use strict';

//аватрака

(function () {
    var FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png' ];

    var inputFile = document.querySelector('#avatar');
    var avatarPicture = document.querySelector('.ad-form-header__preview img');

    inputFile.addEventListener('change', function (evt) {
        var file = inputFile.files[0];
        var fileName = file.name.toLowerCase();

        var isMatches = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it);
        });

        if (isMatches) {
            var reader = new FileReader();

            reader.addEventListener('load', function (evt) {
                avatarPicture.src = reader.result;
            });
            reader.readAsDataURL(file);
        }

    });

    // нижние фото

    var inputPhoto = document.querySelector('#images');
    var photoContainer = document.querySelector('.ad-form__photo-container');

    inputPhoto.addEventListener('change', function () {
        //var photos = document.querySelector('.ad-form__photo');
        var photo = inputPhoto.files[inputPhoto.files.length - 1];
        var photoName = photo.name.toLowerCase();

        var match = FILE_TYPES.some(function (obj) {
            return photoName.endsWith(obj);
        });

        if (match) {
            var reader2 = new FileReader();

            reader2.addEventListener('load', function (evt) {
                var photos = document.querySelector('.ad-form__photo');

                var imgPhoto = avatarPicture.cloneNode();
                imgPhoto.src = reader2.result;
                imgPhoto.setAttribute('width', '100%');
                imgPhoto.setAttribute('height', '100%');

                var newPhoto = photos.cloneNode();
                newPhoto.appendChild(imgPhoto);

                var photos = document.querySelector('.ad-form__photo');

                if (photos.children.length === 0) {
                    if (photos.parentNode) {
                        photos.parentNode.removeChild(photos)
                    };
                };

                photoContainer.appendChild(newPhoto);

            });
            reader2.readAsDataURL(photo)
        }


    })



})();