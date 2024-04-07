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
                priceText.textContent = car.price;
                textContainer.appendChild(priceText);
                
        
                gtacard.appendChild(textContainer);
            }
        });
    })
    .catch(error => console.error('Error fetching cars:', error));
