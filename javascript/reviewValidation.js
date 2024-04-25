function initializeReviewForm() {
    const reviewForm = document.getElementById('reviewForm');
    const commentTextarea = document.getElementById('comment');
    const reviewsContainer = document.getElementById('reviews');

    reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const comment = commentTextarea.value;

        if (!comment) {
            console.error('Comment cannot be empty');
            return; 
        }

        try {
            const response = await fetch('/reviews-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment: comment })
            });

            if (response.ok) {
                const data = await response.text();
                console.log(data);

                commentTextarea.value = '';

                reviewsContainer.insertAdjacentHTML('afterbegin', `
                    <p><strong>NewReviewer</strong></p>
                    <p>${comment}</p>
                `);
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeReviewForm);
