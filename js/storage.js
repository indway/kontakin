/**
 * storage.js - Data management and LocalStorage interface
 */

const STORAGE_KEYS = {
    CONTACTS: 'kontakin_contacts',
    SETTINGS: 'kontakin_settings',
    LAST_SYNC: 'kontakin_last_sync'
};

const Storage = {
    // Contact Management
    getContacts: () => {
        const data = localStorage.getItem(STORAGE_KEYS.CONTACTS);
        return data ? JSON.parse(data) : [];
    },

    saveContacts: (contacts) => {
        localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(contacts));
    },

    getContactById: (id) => {
        const contacts = Storage.getContacts();
        return contacts.find(c => c.id === id);
    },

    addContact: (contact) => {
        const contacts = Storage.getContacts();
        const newContact = {
            ...contact,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        contacts.push(newContact);
        Storage.saveContacts(contacts);
        return newContact;
    },

    updateContact: (id, updatedData) => {
        const contacts = Storage.getContacts();
        const index = contacts.findIndex(c => c.id === id);
        if (index !== -1) {
            contacts[index] = { ...contacts[index], ...updatedData, updatedAt: new Date().toISOString() };
            Storage.saveContacts(contacts);
            return true;
        }
        return false;
    },

    deleteContact: (id) => {
        const contacts = Storage.getContacts();
        const filtered = contacts.filter(c => c.id !== id);
        Storage.saveContacts(filtered);
    },

    // Settings Management
    getSettings: () => {
        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data ? JSON.parse(data) : {
            sheetUrl: '',
            apiKey: '',
            autoSync: false
        };
    },

    saveSettings: (settings) => {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    },

    // Sync Info
    getLastSync: () => {
        return localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
    },

    setLastSync: () => {
        const timestamp = new Date().toLocaleString();
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, timestamp);
    }
};

export default Storage;
