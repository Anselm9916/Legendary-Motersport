document.addEventListener('DOMContentLoaded', function () {
    const orderedContainer = document.getElementById('ordered-container');

    function displayOrderedCars() {
        const orderedCars = JSON.parse(localStorage.getItem('orderedCars')) || [];
        orderedContainer.innerHTML = '';

        orderedCars.forEach((car, index) => {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');

            const carPhoto = document.createElement('img');
            carPhoto.src = car.photo;
            carPhoto.alt = car.name;
            carPhoto.classList.add('car-photo');
            carCard.appendChild(carPhoto);

            const carInfo = document.createElement('div');
            carInfo.classList.add('car-info');

            const carName = document.createElement('h1');
            carName.textContent = car.name;
            carInfo.appendChild(carName);

            const carPrice = document.createElement('p');
            carPrice.textContent = `$${car.price}`;
            carInfo.appendChild(carPrice);

            const completeOrderButton = document.createElement('button');
            completeOrderButton.textContent = 'Complete Order';
            completeOrderButton.classList.add('complete-order-button');
            completeOrderButton.addEventListener('click', function() {
                
                orderedCars.splice(index, 1);
                localStorage.setItem('orderedCars', JSON.stringify(orderedCars));
                
                displayOrderedCars();
            });
            carInfo.appendChild(completeOrderButton);

            carCard.appendChild(carInfo);
            orderedContainer.appendChild(carCard);
        });
    }

    displayOrderedCars();
});
