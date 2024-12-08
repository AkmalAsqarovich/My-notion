# Chrome Extension for Note-Taking

This Chrome extension allows users to efficiently manage notes directly from their browser. Users can add, view, edit, delete, export, and import notes seamlessly, making it an excellent tool for quick and organized note management.

---

## Features

### 1. **Add Notes**

- Users can type notes into the input area and save them by pressing the "Enter" key or clicking the "Add Note" button.

### 2. **View Notes**

- Clicking the "Show Notes" button displays all previously saved notes.
- Notes remain visible until explicitly hidden by the user.

### 3. **Delete Notes**

- Each note has a delete button to remove it individually.
- A "Delete All" button appears after clicking "Show Notes," allowing users to remove all notes after confirming.

### 4. **Copy Notes**

- Each note has a copy button to copy its content to the clipboard instantly.

### 5. **Export & Import**

- Export all notes into a file with the current date in its name.
- Import notes from a file to restore previously saved notes.

---

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top-right corner.
4. Click on "Load unpacked" and select the folder containing this extension.
5. The extension icon will appear in your toolbar.

---

## Usage Instructions

1. **Adding Notes**

   - Open the extension.
   - Type your note in the input field.
   - Press "Enter" or click "Add Note" to save.

2. **Managing Notes**

   - Click "Show Notes" to view saved notes.
   - Use the copy or delete buttons for each note as needed.
   - Click "Delete All" to remove all notes after confirming.

3. **Export & Import**

   - Use the "Export" button to save notes into a file.
   - Use the "Import" button to upload a saved notes file.

---

## Technologies Used

- **HTML**: Structure of the extension’s interface.
- **CSS**: Styling for the interface.
- **JavaScript**: Functionality for handling notes.

---

## Files Overview

- `manifest.json`: Configuration file for the extension.
- `popup.html`: Main interface for the extension.
- `popup.js`: JavaScript logic for note management.
- `styles.css`: Styling for the extension interface.

---

## Contribution

Contributions are welcome! Feel free to fork this repository, make improvements, and submit a pull request.

---

## License

This project is licensed under the MIT License. Feel free to use it as you like.

