/**
 * sync.js - Google Sheets Synchronization logic
 */
import Storage from './storage.js';

const Sync = {
    /**
     * Fetches data from a public Google Sheet CSV export URL.
     * The URL should look like: https://docs.google.com/spreadsheets/d/ID/export?format=csv
     */
    fetchSheetData: async (url) => {
        try {
            // Ensure URL is pointing to CSV export
            let csvUrl = url;
            if (url.includes('/edit')) {
                csvUrl = url.replace(/\/edit.*$/, '/export?format=csv');
            }

            const response = await fetch(csvUrl);
            if (!response.ok) throw new Error('Failed to fetch sheet data');
            
            const csvText = await response.text();
            return Sync.parseCSV(csvText);
        } catch (error) {
            console.error('Sync Error:', error);
            throw error;
        }
    },

    /**
     * Simple CSV parser (can be replaced with PapaParse if complex)
     */
    parseCSV: (text) => {
        const lines = text.split('\n').filter(line => line.trim() !== '');
        if (lines.length < 2) return [];

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        return lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim());
            const contact = {};
            headers.forEach((header, index) => {
                contact[header] = values[index];
            });
            
            // Normalize data to match internal schema
            return {
                id: contact.id || Date.now().toString() + Math.random().toString(36).substr(2, 5),
                name: contact.name || contact.nama || 'Unnamed',
                phone: contact.phone || contact.telepon || contact.whatsapp || '',
                position: contact.position || contact.jabatan || '',
                school: contact.school || contact.sekolah || contact.instansi || '',
                category: contact.category || contact.kategori || 'General'
            };
        });
    },

    /**
     * Merges remote data with local data.
     * Simple implementation: remote data takes precedence if it exists.
     */
    syncWithSheet: async () => {
        const settings = Storage.getSettings();
        if (!settings.sheetUrl) {
            throw new Error('No Google Sheet URL configured');
        }

        const remoteContacts = await Sync.fetchSheetData(settings.sheetUrl);
        const localContacts = Storage.getContacts();

        // Basic Merge Logic: 
        // We use phone number or name as a simple key if ID is not available/consistent
        // For simplicity, we'll replace all if it's a "master sync" app
        
        Storage.saveContacts(remoteContacts);
        Storage.setLastSync();
        
        return remoteContacts;
    }
};

export default Sync;
