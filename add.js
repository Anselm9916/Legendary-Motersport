document.addEventListener('DOMContentLoaded', function () {
    const addItemForm = document.getElementById('addItemForm');

    addItemForm.addEventListener('submit', function (event) {
        event.preventDefault();

        
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const image = document.getElementById('image').value;
        const doors = document.getElementById('doors').value;
        const classValue = document.getElementById('class').value;


        let carsData = JSON.parse(localStorage.getItem('carsData')) || [];
        let lastId = 0;
        if (carsData.length > 0) {
            lastId = carsData[carsData.length - 1].id;
        }

        
        const newItem = {
            id: lastId + 1,
            name: name,
            price: parseFloat(price),
            image: image,
            doors: doors,
            class: classValue,
            disabled: false 
        };

        carsData.push(newItem);
        localStorage.setItem('carsData', JSON.stringify(carsData));

        
        window.dispatchEvent(new StorageEvent('storage', { key: 'carsData' }));

        
        window.location.href = 'library.html';
    });
});