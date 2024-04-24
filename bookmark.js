document.addEventListener('DOMContentLoaded', function () {
    const bookmarkList = document.getElementById('bookmark-list');
    const bookmarkLogo = document.querySelector('.topright img');

    function displayBookmarkedCars() {
        const bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
        bookmarkList.innerHTML = '';

        let totalPrice = 0;
        let numberOfCars = bookmarkedCars.length;

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
            carPrice.textContent = `$${car.price}`;
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
                updateBookmarkCount(bookmarkedCars.length);
            });
            carInfo.appendChild(removeButton);

            carItem.appendChild(carInfo);

            bookmarkList.appendChild(carItem);

            // Add car price to total price
            totalPrice += parseFloat(car.price);
        });

        // Display total price and number of cars
        updateTotalPrice(totalPrice);
        updateNumberOfCars(numberOfCars);
        // Update the count on the bookmark logo
        updateBookmarkCount(numberOfCars);
    }

    function updateTotalPrice(price) {
        const totalPriceElement = document.getElementById('pricecar1');
        totalPriceElement.textContent = `Total Price: $${parseInt(price.toFixed(2))}`;
    }

    function updateNumberOfCars(count) {
        const numberOfCarsElement = document.getElementById('pricecar2');
        numberOfCarsElement.textContent = `Number of Cars: ${count}`;
    }

    function updateBookmarkCount(count) {
        // Create a red dot element to display the count
        const redDot = document.createElement('div');
        redDot.classList.add('red-dot');
        redDot.textContent = count > 9 ? '9+' : count;

        const existingRedDot = document.querySelector('.red-dot');
        if (existingRedDot) {
            existingRedDot.remove();
        }

        bookmarkLogo.appendChild(redDot);
    }

    displayBookmarkedCars();
});
