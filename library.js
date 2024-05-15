function renderCards(data) {
    const allCardsContainer = document.getElementById('allCards');
    allCardsContainer.innerHTML = '';
    data.forEach(car => {
        if (car.name && car.price && car.photo && !car.disabled) {
            const card = document.createElement('div');
            card.classList.add('gtacard');

            const img = document.createElement('img');
            img.src = car.photo;
            img.alt = car.name;

            const textContainer = document.createElement('div');
            textContainer.classList.add('text-container');

            const nameText = document.createElement('p');
            nameText.textContent = car.name;

            const priceText = document.createElement('p');
            priceText.textContent = `$${car.price}`;

            textContainer.appendChild(nameText);
            textContainer.appendChild(priceText);

            card.appendChild(img);
            card.appendChild(textContainer);

            allCardsContainer.appendChild(card);

            card.addEventListener('click', (event) => {
                event.preventDefault();
                console.log('Clicked on car card:', car.id);
                window.location.href = `inspect.html?id=${car.id}`;
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    let carsData = JSON.parse(localStorage.getItem('carsData')) || [];

    if (!carsData || carsData.length === 0) {
        console.log('No cars data found in local storage. Fetching from external source...');
        fetch('gta.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('carsData', JSON.stringify(data));
                carsData = data;
                renderCards(carsData);
            })
            .catch(error => console.error('Error fetching data:', error));
    } else {
        console.log('Cars data found in local storage. Rendering...');
        renderCards(carsData);
    }

    const buttons = document.querySelectorAll('.button');
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            switch(index) {
                case 0:
                    renderCards(carsData);
                    break;
                case 1:
                    renderCards(carsData.filter(car => car.class === 'featured'));
                    break;
                case 2:
                    renderCards(carsData.filter(car => car.doors === "2")); // Ensure correct comparison
                    break;
                case 3:
                    renderCards(carsData.filter(car => car.doors === "4")); // Ensure correct comparison
                    break;
                case 4:
                    renderCards(carsData.filter(car => car.class === 'Motorcycles'));
                    break;
                case 5:
                    renderCards(carsData.filter(car => car.class === 'special'));
                    break;
                default:
                    break;
            }
        });
    });


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

    document.getElementById('lowToHighBtn').addEventListener('click', () => {
        carsData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        renderCards(carsData);
    });

    document.getElementById('highToLowBtn').addEventListener('click', () => {
        carsData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        renderCards(carsData);
    });

    // Add a storage event listener to update the carsData when it changes
    window.addEventListener('storage', function (event) {
        if (event.key === 'carsData') {
            carsData = JSON.parse(localStorage.getItem('carsData'));
            renderCards(carsData);
        }
    });

    window.addEventListener('carsDataUpdated', function () {
        carsData = JSON.parse(localStorage.getItem('carsData')) || [];
        renderCards(carsData);
    });
});