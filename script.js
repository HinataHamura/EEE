// Comment Form Submission Handler
document.getElementById('commentForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const comment = document.getElementById('comment').value;

  if (username && comment) {
    const commentSection = document.getElementById('commentsList');

    // Create a new comment element
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    
    newComment.innerHTML = `
      <strong>${username}</strong>
      <p>${comment}</p>
    `;

    // Add the new comment to the list
    commentSection.appendChild(newComment);

    // Clear the form after submission
    document.getElementById('commentForm').reset();
  }
});

// Lightbox for Meme Images
const lightbox = document.getElementById('lightbox');
const fullImg = document.getElementById('fullImg');
const caption = document.getElementById('caption');
const closeBtn = document.querySelector('.close');

// Get all meme images
const memeImages = document.querySelectorAll('.meme-img');

// Loop through meme images and add click event
memeImages.forEach(img => {
  img.addEventListener('click', function () {
    lightbox.style.display = 'block';
    fullImg.src = this.src;
    caption.innerHTML = this.alt;
  });
});

// Close lightbox when the close button is clicked
closeBtn.onclick = function() {
  lightbox.style.display = 'none';
}

// Close lightbox if clicked outside the image
lightbox.onclick = function(event) {
  if (event.target !== fullImg) {
    lightbox.style.display = 'none';
  }
}
