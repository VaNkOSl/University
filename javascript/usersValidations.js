function eraseText() {
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
}

document.addEventListener('DOMContentLoaded', function(){
    let sendButton = document.getElementById('sendBtn');
    sendButton.addEventListener('click', async function(event) {
        event.preventDefault();

        await document.getElementById('submit-form').submit();
        eraseText();
    });
});