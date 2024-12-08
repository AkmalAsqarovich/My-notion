document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('save-btn');
    const showNotesBtn = document.getElementById('show-notes-btn');
    const noteInput = document.getElementById('note-input');
    const imageInput = document.getElementById('image-input');
    const notesList = document.getElementById('notes-list');
    const exportBtn = document.getElementById('export-btn');
    const importBtn = document.getElementById('import-btn');
    const deleteAllBtn = document.getElementById('delete-all-btn');

    let notesVisible = false; // Qaydlar ko'rinishini boshqarish uchun flag

    // Clipboarddan rasmni olish
    document.addEventListener('paste', (event) => {
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.kind === 'file' && item.type.startsWith('image/')) {
                const file = item.getAsFile();
                const reader = new FileReader();
                reader.onload = function () {
                    const image = `<img src="${reader.result}" alt="Image" style="max-width: 100%; height: auto;">`;
                    const currentText = noteInput.value.trim();
                    noteInput.value = currentText + '\n' + image;
                };
                reader.readAsDataURL(file);
            }
        }
    });

    // Qaydlarni saqlash
    function saveNote() {
        const note = noteInput.value.trim();
        if (note) {
            chrome.storage.local.get(['notes'], (result) => {
                const notes = result.notes || [];
                const now = new Date();
                const timestamp = now.toISOString();
                notes.push({ text: note, date: timestamp });
                chrome.storage.local.set({ notes }, () => {
                    console.log('Note saved.');
                    noteInput.value = ''; // Maydonni tozalash
                });
            });
        }
    }

    // Enter tugmasi bilan saqlash
    noteInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            saveNote();
        }
    });

    // Saqlash tugmasi bosilganda
    saveBtn.addEventListener('click', saveNote);

    // Rasmni matn sifatida qo'shish
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const image = `<img src="${reader.result}" alt="Image" style="max-width: 100%; height: auto;">`;
                const currentText = noteInput.value.trim();
                noteInput.value = currentText + '\n' + image;
            };
            reader.readAsDataURL(file);
        }
    });

    // Qaydlarni ko'rsatish va yashirish
    showNotesBtn.addEventListener('click', () => {
        notesVisible = !notesVisible; // Flagni o'zgartirish
        if (notesVisible) {
            chrome.storage.local.get(['notes'], (result) => {
                if (result.notes) {
                    displayNotes(result.notes);
                }
            });
        } else {
            notesList.innerHTML = ''; // Qaydlarni yashirish
        }
    });

    function displayNotes(notes) {
        notesList.innerHTML = '';
        notes.forEach((noteObj, index) => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';

            const date = new Date(noteObj.date);
            const formattedDate = date.toLocaleString();

            noteItem.innerHTML = `<strong>${formattedDate}</strong><br>${noteObj.text}`;

            // Copy tugmasi
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn button-55';
            copyBtn.textContent = 'Copy';
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(noteObj.text).then(() => {
                    alert('Note copied to clipboard!');
                });
            });
            noteItem.appendChild(copyBtn);

            // Delete tugmasi
            const trashBtn = document.createElement('button');
            trashBtn.className = 'trash-btn button-55';
            trashBtn.textContent = 'Delete';
            trashBtn.addEventListener('click', () => {
                chrome.storage.local.get(['notes'], (result) => {
                    const notes = result.notes || [];
                    notes.splice(index, 1);
                    chrome.storage.local.set({ notes }, () => {
                        displayNotes(notes);
                    });
                });
            });
            noteItem.appendChild(trashBtn);

            notesList.appendChild(noteItem);
        });
    }

    // Export funksiyasi
    exportBtn.addEventListener('click', () => {
        chrome.storage.local.get(['notes'], (result) => {
            if (result.notes) {
                const blob = new Blob([JSON.stringify(result.notes, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const now = new Date();
                const timestamp = now.toISOString().split('T')[0];
                a.download = `notes-${timestamp}.json`;
                a.click();
                URL.revokeObjectURL(url);
            }
        });
    });

    // Import funksiyasi
    importBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', () => {
            const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    try {
                        const notes = JSON.parse(event.target.result);
                        if (Array.isArray(notes)) {
                            chrome.storage.local.set({ notes }, () => {
                                if (notesVisible) {
                                    displayNotes(notes);
                                }
                                alert('Notes imported successfully!');
                            });
                        } else {
                            alert('Invalid file format');
                        }
                    } catch (e) {
                        alert('Error reading file');
                    }
                };
                reader.readAsText(file);
            }
        });
        input.click();
    });

    // Delete All funksiyasi
    deleteAllBtn.addEventListener('click', () => {
        if (confirm('Rostdan ham hammasini o\'chirmoqchimisiz?')) {
            chrome.storage.local.set({ notes: [] }, () => {
                notesList.innerHTML = '';
                notesVisible = false; // Ko'rinishni o'chirish
                alert('All notes deleted.');
            });
        }
    });
});
