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
            removeButton.innerHTML = '<i class="bx bx-x bx-lg"></i>';
            removeButton.classList.add('remove-button');
            removeButton.dataset.index = index;
            removeButton.addEventListener('click', function () {
                const clickedIndex = parseInt(this.dataset.index);
                bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
                bookmarkedCars.splice(clickedIndex, 1);
                localStorage.setItem('bookmarkedCars', JSON.stringify(bookmarkedCars));
                displayBookmarkedCars();
                updateBookmarkBadge();
            });
            carInfo.appendChild(removeButton);

            carItem.appendChild(carInfo);

            bookmarkList.appendChild(carItem);

            totalPrice += parseFloat(car.price);
        });

        updateTotalPrice(totalPrice);
        updateNumberOfCars(numberOfCars);

        updateBookmarkBadge();
    }

    function updateTotalPrice(price) {
        const totalPriceElement = document.getElementById('pricecar1');
        totalPriceElement.textContent = `Total Price: $${parseInt(price.toFixed(2))}`;
    }

    function updateNumberOfCars(count) {
        const numberOfCarsElement = document.getElementById('pricecar2');
        numberOfCarsElement.textContent = `Number of Cars: ${count}`;
    }

    function updateBookmarkBadge() {
        const bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
        const bolletjewinkelwagen = document.querySelector('.topright');
        let redDot = bolletjewinkelwagen.querySelector('.red-dot');
        if (!redDot) {
            const redDotElement = document.createElement('div');
            redDotElement.classList.add('red-dot');
            bolletjewinkelwagen.appendChild(redDotElement);
            redDot = redDotElement;
        }
        if (bookmarkedCars.length > 0) {
            redDot.textContent = bookmarkedCars.length > 99 ? '99+' : bookmarkedCars.length;
            redDot.style.display = 'block';
        } else {
            redDot.style.display = 'none';
        }
    }

    updateBookmarkBadge();

    displayBookmarkedCars();

    function addToOrderedCars() {
        const bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
        const orderedCars = JSON.parse(localStorage.getItem('orderedCars')) || [];

        // Add order number to each car
        const orderNumber = new Date().getTime(); // Unique order number based on timestamp
        const carsWithOrderNumber = bookmarkedCars.map(car => ({
            ...car,
            orderNumber: orderNumber,
        }));

        localStorage.setItem('orderedCars', JSON.stringify(orderedCars.concat(carsWithOrderNumber)));
        localStorage.removeItem('bookmarkedCars');

        window.location.href = 'order.html'; // Redirect to order page after ordering
    }

    const buyButton = document.getElementById('buy-button');
    buyButton.addEventListener('click', addToOrderedCars);
});
