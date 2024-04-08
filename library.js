fetch('gta.json')
    .then(response => response.json())
    .then(data => {
        const allCardsContainer = document.getElementById('allCards');

        data.forEach(car => {
            const card = document.createElement('div');
            card.classList.add('gtacard'); // Changed class to match CSS

            const img = document.createElement('img');
            img.src = car.photo;
            img.alt = car.name;

            const textContainer = document.createElement('div');
            textContainer.classList.add('text-container');

            const nameText = document.createElement('p');
            nameText.textContent = car.name;

            const priceText = document.createElement('p');
            priceText.textContent = car.price;

            textContainer.appendChild(nameText);
            textContainer.appendChild(priceText);

            card.appendChild(img);
            card.appendChild(textContainer);

            allCardsContainer.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
