document.addEventListener('DOMContentLoaded', function () {
    fetch('gta.json')
        .then(response => response.json())
        .then(data => {
            const gtacards = document.querySelectorAll('.gtacard');
            gtacards.forEach((gtacard, index) => {
                if (index < data.length) {
                    const car = data[index];
                    const img = gtacard.querySelector('img');
                    img.src = car.photo;
                    img.alt = car.name;

                    const textContainer = document.createElement('div');
                    textContainer.classList.add('text-container');

                    const nameText = document.createElement('p');
                    nameText.textContent = car.name;
                    textContainer.appendChild(nameText);

                    const priceText = document.createElement('p');
                    priceText.textContent = `$${car.price}`;
                    textContainer.appendChild(priceText);

                    gtacard.appendChild(textContainer);
                }
            });
        })
        .catch(error => console.error('Error fetching cars:', error));

    // Function to update the badge count based on the number of bookmarked cars
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
