// admin-panel/settings.js

// Placeholder for loading settings from Firestore
function loadSettings() {
    // TODO: Implement fetching settings from Firestore (e.g., from a document like 'platformSettings/global')
    console.log("Loading platform settings...");

    // Example placeholder data
    const settingsData = {
        siteTitle: "Aubray Platform",
        siteDescription: "A platform for real estate and home-based businesses.",
        enableChat: true,
        enableBookings: false
        // Add more default settings
    };

    populateSettingsForm(settingsData);
}

// Placeholder for populating the form with settings data
function populateSettingsForm(settings) {
    document.getElementById("site-title").value = settings.siteTitle;
    document.getElementById("site-description").value = settings.siteDescription;
    document.getElementById("enable-chat").checked = settings.enableChat;
    document.getElementById("enable-bookings").checked = settings.enableBookings;
    // Populate other form fields
}

// Placeholder for saving settings to Firestore
function saveSettings(event) {
    event.preventDefault(); // Prevent default form submission

    // TODO: Implement saving settings to Firestore
    console.log("Saving platform settings...");

    const settingsForm = document.getElementById('settings-form');
    const formData = new FormData(settingsForm);

    const updatedSettings = {};
    for (const [key, value] of formData.entries()) {
        updatedSettings[key] = value;
    }

    // Handle checkboxes separately as FormData only includes checked ones
    updatedSettings.enableChat = document.getElementById('enable-chat').checked;
    updatedSettings.enableBookings = document.getElementById('enable-bookings').checked;

    console.log("Updated settings:", updatedSettings);

    // TODO: Use Firebase Firestore SDK to update the settings document
    alert("Settings saved! (Saving logic not fully implemented)");
}

// Add event listener for form submission
document.getElementById("settings-form").addEventListener("submit", saveSettings);

// Load settings when the page loads
document.addEventListener("DOMContentLoaded", loadSettings);
