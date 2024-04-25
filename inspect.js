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

    // Function to update the badge count based on the number of bookmarked cars
    function updateBookmarkBadge() {
        const bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
        const bolletjewinkelwagen = document.getElementById('topright');
        if (bookmarkedCars.length > 0) {
            bolletjewinkelwagen.classList.add('badge');
        } else {
            bolletjewinkelwagen.classList.remove('badge');
        }
        bolletjewinkelwagen.textContent = bookmarkedCars.length;
    }

    // Call updateBookmarkBadge initially to ensure badge count is updated on page load
    updateBookmarkBadge();
});
