function populateCarModels() {
    let brands = {
      audi: ["A3", "A4", "A6"],
      bmw: ["3 Series", "5 Series", "7 Series"],
      mercedes: ["C-Class", "E-Class", "S-Class"],
      volkswagen: ["Golf", "Passat", "Tiguan"],
      toyota: ["Corolla", "Camry", "RAV4"]
    };
  
    const brandSelect = document.getElementById("brand");
    const modelSelect = document.getElementById("model");
  
    brandSelect.addEventListener("change", function() {
      const selectedBrand = this.value;
      const models = brands[selectedBrand] || [];
      modelSelect.innerHTML = "";
  
      models.forEach(function(model) {
        const option = document.createElement("option");
        option.text = model;
        option.value = model.toLowerCase().replace(/\s/g, "-");
        modelSelect.add(option);
      });
    });
  
    brandSelect.dispatchEvent(new Event("change"));
  }
  
  document.addEventListener("DOMContentLoaded", function() {

    populateCarModels();
  
    document.getElementById('brand').addEventListener('change', function() {
      let brand = this.value;
      const models = document.getElementById('model').getElementsByTagName('optgroup');
  
      for (let i = 0; i < models.length; i++) {
        if (models[i].id === brand) {
          models[i].style.display = 'block';
        } else {
          models[i].style.display = 'none';
        }
      }
    });
  });
  
