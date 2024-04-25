function deleteCars(carId) {
    fetch(`/delete-car/${carId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        alert('The vehicle was successfully deleted.');
        location.reload();
      } else {
        alert('An error occurred while deleting the vehicle');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while sending the deletion request.');
    });
  };

  