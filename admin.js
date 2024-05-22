document.addEventListener('DOMContentLoaded', function () {
    let carsData = JSON.parse(localStorage.getItem('carsData')) || [];
    
    function renderCarsData() {
        const carDetailsContainer = document.querySelector('.car-details-container');
        carDetailsContainer.innerHTML = '';

        carsData.forEach(car => {
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
                        if (option === 'Name') {
                            car.name = newValue;
                        } else if (option === 'Price') {
                            car.price = newValue;
                        } else if (option === 'Doors') {
                            car.doors = newValue;
                        } else if (option === 'Class') {
                            car.class = newValue;
                        }
                        localStorage.setItem('carsData', JSON.stringify(carsData));
                        renderCarsData();
                    }
                });
                dropdownContent.appendChild(optionLink);
            });

            const enableDisableButton = document.createElement('button');
            enableDisableButton.textContent = car.disabled ? 'Enable' : 'Disable';
            enableDisableButton.classList.add('enable-disable-button');
            enableDisableButton.addEventListener('click', () => {
                car.disabled = !car.disabled;
                enableDisableButton.textContent = car.disabled ? 'Enable' : 'Disable';
                localStorage.setItem('carsData', JSON.stringify(carsData));
            });

            carInfo.appendChild(carName);
            carInfo.appendChild(carPrice);
            carInfo.appendChild(carDoors);
            carInfo.appendChild(carClass);
            carInfo.appendChild(editButton);
            carInfo.appendChild(dropdownContent);
            carInfo.appendChild(enableDisableButton);

            carCard.appendChild(carPhoto);
            carCard.appendChild(carInfo);

            carDetailsContainer.appendChild(carCard);
        });
    }

    function restoreAll() {
        localStorage.removeItem("carsData");

        fetch('gta.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(newData => {
                let existingData = JSON.parse(localStorage.getItem('carsData')) || [];

                existingData = existingData.concat(newData);
                localStorage.setItem("carsData", JSON.stringify(existingData));

                renderCarsData();

                location.reload();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const restoreAllButton = document.getElementById('restore-all-button');
    restoreAllButton.addEventListener('click', restoreAll);

    if (carsData.length > 0) {
        renderCarsData();
    } else {
        console.error('No cars data found in local storage.');
    }

    
    window.addEventListener('storage', function (event) {
        if (event.key === 'carsData') {
            carsData = JSON.parse(localStorage.getItem('carsData'));
            renderCarsData();
        }
    });
    window.dispatchEvent(new Event('carsDataUpdated'));
});