if (!carsData) {
    fetch('gta.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('carsData', JSON.stringify(data));
            carsData = data;
            renderCards(carsData);
        })
        .catch(error => console.error('Error fetching data:', error));
} else {
    renderCards(carsData);
}