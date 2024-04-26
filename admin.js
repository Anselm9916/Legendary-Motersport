document.addEventListener('DOMContentLoaded', function () {
    const carsData = JSON.parse(localStorage.getItem('carsData'));

    function renderCarsData(data) {
        const carDetailsContainer = document.querySelector('.car-details-container');
        carDetailsContainer.innerHTML = '';

        data.forEach(car => {
            const carCard = document.createElement('div');
            carCard.classList.add('car-card');

            const carPhoto = document.createElement('img');
            carPhoto.src = car.photo;
            carPhoto.alt = car.name;
            carPhoto.classList.add('car-photo');

            const carInfo = document.createElement('div');
            carInfo.classList.add('car-info');

            const carName = document.createElement('h1');
            carName.textContent = car.name;
            carName.classList.add('car-name');

            const carPrice = document.createElement('p');
            carPrice.textContent = `Price: $${car.price}`;
            carPrice.classList.add('car-price');

            const carDoors = document.createElement('p');
            carDoors.textContent = `Doors: ${car.doors}`;
            carDoors.classList.add('car-doors');

            const carClass = document.createElement('p');
            carClass.textContent = `Class: ${car.class}`;
            carClass.classList.add('car-class');

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', () => {
                dropdownContent.classList.toggle('show');
            });

            const dropdownContent = document.createElement('div');
            dropdownContent.classList.add('dropdown-content');
            const options = ['Name', 'Price', 'Doors', 'Class'];
            options.forEach(option => {
                const optionLink = document.createElement('a');
                optionLink.textContent = option;
                optionLink.addEventListener('click', () => {
                    const newValue = prompt(`Enter new value for ${option}:`);
                    if (newValue !== null && newValue.trim() !== '') {
                        // Update the corresponding property in the car object
                        if (option === 'Name') {
                            car.name = newValue;
                        } else if (option === 'Price') {
                            car.price = newValue;
                        } else if (option === 'Doors') {
                            car.doors = newValue;
                        } else if (option === 'Class') {
                            car.class = newValue;
                        }
                        // Update the local storage
                        localStorage.setItem('carsData', JSON.stringify(data));
                        // Re-render the cars data
                        renderCarsData(data);
                    }
                });
                dropdownContent.appendChild(optionLink);
            });

            carInfo.appendChild(carName);
            carInfo.appendChild(carPrice);
            carInfo.appendChild(carDoors);
            carInfo.appendChild(carClass);
            carInfo.appendChild(editButton);
            carInfo.appendChild(dropdownContent);

            carCard.appendChild(carPhoto);
            carCard.appendChild(carInfo);

            carDetailsContainer.appendChild(carCard);
        });
    }

    if (carsData) {
        renderCarsData(carsData);
    } else {
        console.error('No cars data found in local storage.');
    }
});
