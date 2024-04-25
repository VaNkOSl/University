function eraseText() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

document.addEventListener('DOMContentLoaded', function(){
    let addButton = document.getElementById('loginButton');
    addButton.addEventListener('click', async function(event) {
        event.preventDefault();

        await document.getElementById('registerForm').submit();
        eraseText();
    });
});