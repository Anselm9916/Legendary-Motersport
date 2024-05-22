document.addEventListener('DOMContentLoaded', function () {
    const orderedContainer = document.getElementById('ordered-container');

    function displayOrderedCars() {
        const orderedCars = JSON.parse(localStorage.getItem('orderedCars')) || [];
        orderedContainer.innerHTML = '';

        // Group cars by order number
        const orders = orderedCars.reduce((acc, car) => {
            acc[car.orderNumber] = acc[car.orderNumber] || [];
            acc[car.orderNumber].push(car);
            return acc;
        }, {});

        // Process each order
        Object.keys(orders).forEach(orderNumber => {
            const carsInOrder = orders[orderNumber];
            const orderCard = document.createElement('div');
            orderCard.classList.add('order-card');

            // Order header
            const orderHeader = document.createElement('div');
            orderHeader.classList.add('order-header');
            const orderNumberElement = document.createElement('h2');
            orderNumberElement.textContent = `Order Number: ${orderNumber}`;
            const numberOfCarsElement = document.createElement('p');
            numberOfCarsElement.textContent = `Number of Cars: ${carsInOrder.length}`;
            orderHeader.appendChild(orderNumberElement);
            orderHeader.appendChild(numberOfCarsElement);
            orderCard.appendChild(orderHeader);

            // Group identical cars and count them
            const carCounts = carsInOrder.reduce((acc, car) => {
                const key = `${car.name}-${car.photo}-${car.price}-${car.doors}-${car.class}`;
                acc[key] = acc[key] || { car, count: 0 };
                acc[key].count += 1;
                return acc;
            }, {});

            // Create a card for each unique car
            Object.values(carCounts).forEach(({ car, count }) => {
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

                const carDoors = document.createElement('p');
                carDoors.textContent = `Doors: ${car.doors}`;
                carInfo.appendChild(carDoors);

                const carClass = document.createElement('p');
                carClass.textContent = `Class: ${car.class}`;
                carInfo.appendChild(carClass);

                if (count > 1) {
                    const carCount = document.createElement('p');
                    carCount.textContent = `Quantity: ${count}`;
                    carInfo.appendChild(carCount);
                }

                carCard.appendChild(carInfo);
                orderCard.appendChild(carCard);
            });

            // Complete order button
            const completeOrderButton = document.createElement('button');
            completeOrderButton.textContent = 'Complete Order';
            completeOrderButton.classList.add('complete-order-button');
            completeOrderButton.addEventListener('click', function() {
                const remainingCars = orderedCars.filter(car => car.orderNumber !== parseInt(orderNumber));
                localStorage.setItem('orderedCars', JSON.stringify(remainingCars));
                displayOrderedCars();
            });
            orderCard.appendChild(completeOrderButton);

            orderedContainer.appendChild(orderCard);
        });
    }

    displayOrderedCars();
});
