document.addEventListener('DOMContentLoaded', function () {
    const bookmarkList = document.getElementById('bookmark-list');
    
    // Display bookmarked cars
    function displayBookmarkedCars() {
        const bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
        bookmarkList.innerHTML = ''; // Clear previous list

        bookmarkedCars.forEach((car, index) => {
            const carItem = document.createElement('div');
            carItem.classList.add('car-card');

            const carPhoto = document.createElement('img');
            carPhoto.src = car.photo;
            carPhoto.alt = car.name;
            carPhoto.classList.add('car-photo');
            carItem.appendChild(carPhoto);

            const carInfo = document.createElement('div');
            carInfo.classList.add('car-info');

            const carName = document.createElement('h1');
            carName.textContent = car.name;
            carInfo.appendChild(carName);

            const carPrice = document.createElement('p');
            carPrice.textContent = car.price;
            carInfo.appendChild(carPrice);

            const carDoors = document.createElement('p');
            carDoors.textContent = `Doors: ${car.doors}`;
            carInfo.appendChild(carDoors);

            const carClass = document.createElement('p');
            carClass.textContent = `Class: ${car.class}`;
            carInfo.appendChild(carClass);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'X';
            removeButton.classList.add('remove-button');
            removeButton.dataset.index = index; // Set index as a data attribute
            removeButton.addEventListener('click', function() {
                const clickedIndex = parseInt(this.dataset.index); // Retrieve index from data attribute
                const bookmarkedCars = JSON.parse(localStorage.getItem('bookmarkedCars')) || [];
                bookmarkedCars.splice(clickedIndex, 1);
                localStorage.setItem('bookmarkedCars', JSON.stringify(bookmarkedCars));
                displayBookmarkedCars(); // Refresh the displayed list
            });
            carInfo.appendChild(removeButton);

            carItem.appendChild(carInfo);

            bookmarkList.appendChild(carItem);
        });
    }

    displayBookmarkedCars(); // Display bookmarked cars when the page loads
});
