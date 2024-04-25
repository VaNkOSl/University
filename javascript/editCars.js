function editOrder(carId) {
    let newData = {};
    
    const brandSelect = document.getElementById('brand');
    const titleInput = document.getElementById('title');
    const priceInput = document.getElementById('price');
    const yearSelect = document.getElementById('year');
    const powerInput = document.getElementById('power');
    const euroStandardSelect = document.getElementById('euroStandard');
    const engineCapacityInput = document.getElementById('engineCapacity');
    const transmissionSelect = document.getElementById('transmission');
    const categorySelect = document.getElementById('category');
    const mileageInput = document.getElementById('mileage');
    const colorInput = document.getElementById('color');
    const fuelTypeSelect = document.getElementById('fuelType');
    
    fetch(`/carsEdit/${carId}`, {
        method: 'PUT',  
        headers: {
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify(newData)  
    })
    .then(response => response.json())
    .then(updatedCar => {
      brandSelect.value = updatedCar.brand;
      titleInput.value = updatedCar.title;
      priceInput.value = updatedCar.price;
      yearSelect.value = updatedCar.year;
      powerInput.value = updatedCar.power;
      euroStandardSelect.value = updatedCar.euroStandard;
      engineCapacityInput.value = updatedCar.engineCapacity;
      transmissionSelect.value = updatedCar.transmission;
      categorySelect.value = updatedCar.category;
      mileageInput.value = updatedCar.mileage;
      colorInput.value = updatedCar.color;
      fuelTypeSelect.value = updatedCar.fuelType;
  
      deleteCarsForEdit(carId);
  
      if (Object.keys(newData).length === 0) {
        console.log('No changes made. No request sent.');
        return;
      }
      console.log('Car updated successfully:', updatedCar);
  })
  
    .catch(error => {
        console.error('Error updating car:', error);
    });
  }
  
  function deleteCarsForEdit(orderId) {
    const tableRow = document.getElementById(`tableRow-${orderId}`);
    
    if (tableRow) {
      tableRow.remove();
    } else {
      console.log(`Row with ID ${orderId} not found.`);
    }
  };