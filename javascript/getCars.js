$(document).ready(function() {
    $.get('/get-cars', function(data){
      data.forEach(function(cars) {
        let newRow = generateCarRow(cars);
        $('#avaibleTable tbody').append(newRow);
      })
    })
  });

function generateCarRow(car) {
  let row = document.createElement('tr');
  row.id = `tableRow-${car._id}`;

  const properties = ['_id', 'title', 'price', 'brand', 'model', 'image', 'year',
   'fuelType', 'power', 'euroStandard', 'engineCapacity', 'transmission', 'category',
    'mileage', 'color'];
  properties.forEach(prop => {
    let cell = createCell(car[prop]);
    row.appendChild(cell);
  });

  let editButton = createButton('Edit', () => editOrder(car._id));
  let editCell = document.createElement('td');
  editCell.appendChild(editButton);
  row.appendChild(editCell);

  let deleteButton = createButton('Delete', () => deleteCars(car._id));
  let deleteCell = document.createElement('td');
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);

  return row;
}


function createCell(content) {
  let cell = document.createElement('td');
  cell.textContent = content;
  return cell;
};

function createButton(text, onclick) {
  let button = document.createElement('button');
  button.textContent = text;
  button.onclick = onclick;
  return button;
};
