// user-dashboard/upload.js

// Placeholder for handling file selection
document.getElementById('file-input').addEventListener('change', function(event) {
    const fileNameSpan = document.getElementById('file-name');
    if (event.target.files.length > 0) {
        fileNameSpan.textContent = event.target.files[0].name;
    } else {
        fileNameSpan.textContent = 'No file chosen';
    }
});

// Placeholder for handling the upload button click
document.getElementById('upload-button').addEventListener('click', function() {
    const fileInput = document.getElementById('file-input');
    const contentType = document.getElementById('content-type').value;
    const uploadStatus = document.getElementById('upload-status');
    const progressBar = document.getElementById('progress-bar');

    if (fileInput.files.length === 0) {
        uploadStatus.textContent = 'Please select a file to upload.';
        return;
    }

    const file = fileInput.files[0];

    // TODO: Implement upload logic using Firebase Storage and Firestore
    console.log(`Uploading file: ${file.name}, Content Type: ${contentType}`);

    // Example upload process (replace with actual Firebase Storage upload)
    uploadStatus.textContent = 'Starting upload...';
    progressBar.value = 0;

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.value = progress;
        uploadStatus.textContent = `Uploading: ${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
            uploadStatus.textContent = 'Upload complete!';
            // TODO: Save metadata to Firestore
            console.log('File uploaded, now save metadata to Firestore.');
        }
    }, 200);

    // TODO: Add error handling for upload failures
});

// Placeholder for dynamically showing/hiding fields based on content type
document.getElementById('content-type').addEventListener('change', function(event) {
    const selectedType = event.target.value;
    const additionalFieldsDiv = document.getElementById('additional-fields');

    // TODO: Implement logic to show/hide/generate input fields based on selectedType
    console.log(`Content type changed to: ${selectedType}`);
    additionalFieldsDiv.innerHTML = ''; // Clear current fields

    // Example: Add a title field for all types (you'll need more specific logic)
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'content-title';
    titleInput.name = 'contentTitle';
    additionalFieldsDiv.appendChild(titleLabel);
    additionalFieldsDiv.appendChild(titleInput);

    // Add more specific fields based on selectedType (e.g., location for property, description for video)
});

// Initialize the additional fields when the page loads (based on default content type)
document.addEventListener("DOMContentLoaded", () => {
    // Trigger the change event for the default selected type
    document.getElementById('content-type').dispatchEvent(new Event('change'));
});
