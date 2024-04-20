    document.addEventListener('DOMContentLoaded', function () {
        const bookmarkList = document.getElementById('bookmark-list');
        
        function displayBookmarkedCars() {
            const bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
            bookmarkList.innerHTML = '';

            bookmarkedCars.forEach((car, index) => {
                const carItem = document.createElement('div');
                carItem.classList.add('car-card');

                const carPhoto = document.createElement('img');
                carPhoto.src = car.photo;
                carPhoto.alt = car.name;
                carPhoto.classList.add('car-photo');
                carItem.appendChild(carPhoto);

                const carInfo = document.createElement('div');
                carInfo.classList.add('car-info');

                const carName = document.createElement('h1');
                carName.textContent = car.name;
                carInfo.appendChild(carName);

                const carPrice = document.createElement('p');
                carPrice.textContent = car.price;
                carInfo.appendChild(carPrice);

                const carDoors = document.createElement('p');
                carDoors.textContent = `Doors: ${car.doors}`;
                carInfo.appendChild(carDoors);

                const carClass = document.createElement('p');
                carClass.textContent = `Class: ${car.class}`;
                carInfo.appendChild(carClass);

                const removeButton = document.createElement('div');
                removeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>';
                removeButton.classList.add('remove-button');
                removeButton.dataset.index = index;
                removeButton.addEventListener('click', function() {
                    const clickedIndex = parseInt(this.dataset.index);
                    const bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
                    bookmarkedCars.splice(clickedIndex, 1);
                    localStorage.setItem('bookmarkedCars', JSON.stringify(bookmarkedCars));
                    displayBookmarkedCars();
                });
                carInfo.appendChild(removeButton);

                carItem.appendChild(carInfo);

                bookmarkList.appendChild(carItem);
            });
        }

        displayBookmarkedCars()
    });
