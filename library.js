document.addEventListener('DOMContentLoaded', function () {
    fetch('gta.json')
        .then(response => response.json())
        .then(data => {
            const allCardsContainer = document.getElementById('allCards');
            let filteredData = data;

            function renderCards(data) {
                allCardsContainer.innerHTML = '';
                data.forEach(car => {
                    if (car.name && car.price && car.photo) {
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
                        priceText.textContent = car.price;
            
                        textContainer.appendChild(nameText);
                        textContainer.appendChild(priceText);
            
                        card.appendChild(img);
                        card.appendChild(textContainer);
            
                        allCardsContainer.appendChild(card);
                    }
                });
            }
            
            
            document.querySelector('.button:nth-of-type(1)').addEventListener('click', () => {
                filteredData = data;
                renderCards(filteredData);
            });

            document.querySelector('.button:nth-of-type(2)').addEventListener('click', () => {
                filteredData = data.filter(car => car.class === 'featured');
                renderCards(filteredData);
            });

            document.querySelector('.button:nth-of-type(3)').addEventListener('click', () => {
                filteredData = data.filter(car => car.doors === '2');
                renderCards(filteredData);
            });

            document.querySelector('.button:nth-of-type(4)').addEventListener('click', () => {
                filteredData = data.filter(car => car.doors === '4');
                renderCards(filteredData);
            });

            document.querySelector('.button:nth-of-type(5)').addEventListener('click', () => {
                filteredData = data.filter(car => car.class === 'Motorcycles');
                renderCards(filteredData);
            });

            document.querySelector('.button:nth-of-type(6)').addEventListener('click', () => {
                filteredData = data.filter(car => car.class === 'special');
                renderCards(filteredData);
            });

            document.querySelector('.sortprice').addEventListener('click', () => {
                filteredData.sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g, '')) - parseFloat(b.price.replace(/[^0-9.-]+/g, '')));
                renderCards(filteredData);
            });

        
            renderCards(filteredData);
        })
        .catch(error => console.error('Error fetching data:', error));
});

