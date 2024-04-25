function eraseText() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

document.addEventListener('DOMContentLoaded', function(){
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', async function(event) { 
        event.preventDefault();

        await document.getElementById('reservationForm').submit();

        eraseText();
    });
});