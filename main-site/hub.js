// hub.js

// Placeholder for fetching video content
function fetchContent(category = 'all') {
    // TODO: Implement fetching logic based on category
    // This could involve fetching from Firestore or a video platform API (e.g., YouTube Data API)
    console.log(`Fetching content for category: ${category}...`);

    // Example placeholder data
    const contentData = [
        {
            id: "vid1",
            title: "Real Estate Photography Tutorial",
            category: "tutorials",
            videoUrl: "https://www.youtube.com/embed/placeholder1"
        },
        {
            id: "vid2",
            title: "Interview with a Top Agent",
            category: "interviews",
            videoUrl: "https://www.youtube.com/embed/placeholder2"
        },
        // Add more content data
    ];

    renderContent(contentData.filter(item => category === 'all' || item.category === category));
}

// Placeholder for rendering content in the HTML
function renderContent(content) {
    const contentFeed = document.querySelector(".content-feed");
    contentFeed.innerHTML = ""; // Clear existing placeholders

    content.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("content-card");
        card.innerHTML = `
            <iframe width="560" height="315" src="${item.videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h3>${item.title}</h3>
            <p>Category: ${item.category}</p>
        `;
        contentFeed.appendChild(card);
    });
}

// Event listeners for tab buttons
document.querySelectorAll(".tab-button").forEach(button => {
    button.addEventListener("click", () => {
        // Update active tab class
        document.querySelector(".tab-button.active").classList.remove("active");
        button.classList.add("active");

        const category = button.dataset.category;
        fetchContent(category);
    });
});

// Initialize content feed on page load
document.addEventListener("DOMContentLoaded", () => {
    fetchContent(); // Fetch all content initially
});
