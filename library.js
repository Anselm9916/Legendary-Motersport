document.addEventListener('DOMContentLoaded', function () {
    fetch('gta.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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

                        
                        
                        card.addEventListener('click', (event) => {
                            event.preventDefault();
                            console.log('Clicked on car card:', car.id);
                            window.location.href = `inspect.html?id=${car.id}`;
                        });
                    }
                });
            }
            
            
            
            const buttons = document.querySelectorAll('.button');
            buttons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    switch(index) {
                        case 0:
                            filteredData = data;
                            break;
                        case 1:
                            filteredData = data.filter(car => car.class === 'featured');
                            break;
                        case 2:
                            filteredData = data.filter(car => car.doors === '2');
                            break;
                        case 3:
                            filteredData = data.filter(car => car.doors === '4');
                            break;
                        case 4:
                            filteredData = data.filter(car => car.class === 'Motorcycles');
                            break;
                        case 5:
                            filteredData = data.filter(car => car.class === 'special');
                            break;
                        default:
                            break;
                    }
                    renderCards(filteredData);
                });
            });

            
            document.querySelector('.sortprice').addEventListener('click', () => {
                filteredData.sort((a, b) => parseFloat(a.price.replace(/[^0-9.-]+/g, '')) - parseFloat(b.price.replace(/[^0-9.-]+/g, '')));
                renderCards(filteredData);
            });

            renderCards(filteredData);
        })
        .catch(error => console.error('Error fetching data:', error));
});
