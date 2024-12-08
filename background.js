chrome.commands.onCommand.addListener((command) => {
    if (command === 'save_note') {
        // Popupni ko'rsatish uchun
        chrome.action.openPopup();
    }
});
