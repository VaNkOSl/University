fetch('/car-titles')
  .then(response => response.json())
  .then(data => {
    data.forEach(car => {
      const option = document.createElement('option');
      option.value = car.title;
      option.textContent = car.title;
      document.getElementById('product').appendChild(option);
    });
  })
  .catch(error => console.error('Error:', error));
