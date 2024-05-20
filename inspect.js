document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    if (!carId) {
        console.error('Invalid car ID');
        return;
    }

    const carsData = JSON.parse(localStorage.getItem('carsData')) || [];

    const car = carsData.find(car => car.id === parseInt(carId));
    if (!car) {
        console.error('Car not found');
        return;
    }

    document.getElementById('car-name').textContent = car.name;
    document.getElementById('car-photo').src = car.photo;
    document.getElementById('car-price').textContent = `$${car.price}`;
    document.getElementById('car-doors').textContent = `Doors: ${car.doors}`;
    document.getElementById('car-class').textContent = `Class: ${car.class}`;

    const bookmarkButton = document.getElementById('car-price-button');
    bookmarkButton.textContent = `Bookmark ${car.name}`;
    bookmarkButton.addEventListener('click', function() {
        let bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
        bookmarkedCars.push(car);
        localStorage.setItem('bookmarkedCars', JSON.stringify(bookmarkedCars));
        updateBookmarkBadge();
    });

    
    if (car.logo) {
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
