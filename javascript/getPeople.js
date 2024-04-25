$(document).ready(function() {
    $.get('/get-people', function(data) {
      data.forEach(function(person) {
        var newRow = '<tr><td>' + person._id + '</td><td>' +
         person.name + '</td><td>' + person.address + '</td><td>' + person.product + '</td></tr>';
        $('#ordersTable tbody').append(newRow);
      });
    });
  });
  