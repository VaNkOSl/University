function validateFile() {
    const fileInput = document.getElementById('image');
    if (fileInput.files.length === 0) {
      alert('Please select a file to upload.');
      return false;
    }
    fileInput.textContent = '';
    return true;
  }
  

  function eraseText() {
    
    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('year').value = '';
    document.getElementById('power').value = '';
    document.getElementById('euroStandard').value = '';
    document.getElementById('engineCapacity').value = '';
    document.getElementById('transmission').value = '';
    document.getElementById('category').value = '';
    document.getElementById('mileage').value = '';
    document.getElementById('color').value = '';
    document.getElementById('fuelType').value = '';
  }

  function areFieldsEmpty() {
    var title = document.getElementById('title').value.trim();
    var price = document.getElementById('price').value.trim();
    var year = document.getElementById('year').value.trim();
    var power = document.getElementById('power').value.trim();
    var euroStandard = document.getElementById('euroStandard').value.trim();
    var engineCapacity = document.getElementById('engineCapacity').value.trim();
    var transmission = document.getElementById('transmission').value.trim();
    var category = document.getElementById('category').value.trim();
    var mileage = document.getElementById('mileage').value.trim();
    var color = document.getElementById('color').value.trim();
    var fuelType = document.getElementById('fuelType').value.trim();

    var errorMessage = '';

    if (title === '') errorMessage += 'Title field is empty.\n';
    if (price === '') errorMessage += 'Price field is empty.\n';
    if (year === '') errorMessage += 'Year field is empty.\n';
    if (power === '') errorMessage += 'Power field is empty.\n';
    if (euroStandard === '') errorMessage += 'Euro Standard field is empty.\n';
    if (engineCapacity === '') errorMessage += 'Engine Capacity field is empty.\n';
    if (transmission === '') errorMessage += 'Transmission field is empty.\n';
    if (category === '') errorMessage += 'Category field is empty.\n';
    if (mileage === '') errorMessage += 'Mileage field is empty.\n';
    if (color === '') errorMessage += 'Color field is empty.\n';
    if (fuelType === '') errorMessage += 'Fuel Type field is empty.\n';

    if (errorMessage !== '') {
        alert(errorMessage);
        return true;
    }

    return false; 
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addCarButton');

    addButton.addEventListener('click', async function(event) {
        event.preventDefault(); 

        if (validateFile() && !areFieldsEmpty()) { 
          await document.getElementById('carForm').submit(); 
          eraseText();
      }  
    });
});