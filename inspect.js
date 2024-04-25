document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    if (!carId) {
        console.error('Invalid car ID');
        return;
    }

    fetch('gta.json')
        .then(response => response.json())
        .then(data => {
            const car = data.find(car => car.id === parseInt(carId));
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
                updateBookmarkBadge(); // Update the badge count after bookmarking
            });

            // Check if car has logo and display it
            if (car.logo) {
                document.querySelector('.left-card').prepend(carLogo);
            }
        })
        .catch(error => console.error('Error fetching data:', error));

        function updateBookmarkBadge() {
            const bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
            const bolletjewinkelwagen = document.querySelector('.topright');
            let redDot = bolletjewinkelwagen.querySelector('.red-dot'); // Use let instead of const
            if (!redDot) {
                const redDotElement = document.createElement('div');
                redDotElement.classList.add('red-dot');
                bolletjewinkelwagen.appendChild(redDotElement);
                redDot = redDotElement; // Update the redDot variable
            }
            if (bookmarkedCars.length > 0) {
                redDot.textContent = bookmarkedCars.length > 99 ? '99+' : bookmarkedCars.length;
                redDot.style.display = 'block';
            } else {
                redDot.style.display = 'none';
            }
        }
    
        // Call updateBookmarkBadge initially to ensure badge count is updated on page load
        updateBookmarkBadge();
});
