document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    if (!carId) {
        console.error('Invalid car ID');
        return;
    }

    const carsData = JSON.parse(localStorage.getItem('carsData')) || [];

    const foundCar = carsData.find(carData => carData.id === parseInt(carId));
    if (!foundCar) {
        console.error('Car not found');
        return;
    }

    document.getElementById('car-name').textContent = foundCar.name;
    document.getElementById('car-photo').src = foundCar.photo;
    document.getElementById('car-price').textContent = `$${foundCar.price}`;
    document.getElementById('car-doors').textContent = `Doors: ${foundCar.doors}`;
    document.getElementById('car-class').textContent = `Class: ${foundCar.class}`;

    const bookmarkButton = document.getElementById('car-price-button');
    bookmarkButton.textContent = `Bookmark ${foundCar.name}`;
    bookmarkButton.addEventListener('click', function () {
        let bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
        bookmarkedCars.push(foundCar);
        localStorage.setItem('bookmarkedCars', JSON.stringify(bookmarkedCars));
        updateBookmarkBadge();
    });

    if (foundCar.logo) {
        const carLogo = document.createElement('img');
        carLogo.src = foundCar.logo;
        carLogo.alt = foundCar.name;
        document.querySelector('.left-card').prepend(carLogo);
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
});
