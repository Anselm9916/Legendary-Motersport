document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');

    if (!carId) {
        console.error('Invalid car ID');
        return;
    }

    fetch('gta.json')
        .then(response => response.json())
        .then(data => {
            const car = data.find(car => car.id === parseInt(carId));
            if (!car) {
                console.error('Car not found');
                return;
            }

            document.getElementById('car-name').textContent = car.name;
            document.getElementById('car-photo').src = car.photo;
            document.getElementById('car-price').textContent = car.price;
            document.getElementById('car-doors').textContent = `Doors: ${car.doors}`;
            document.getElementById('car-class').textContent = `Class: ${car.class}`;
        })
        .catch(error => console.error('Error fetching data:', error));
});
