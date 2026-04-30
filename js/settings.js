/**
 * settings.js - Logic for the settings and sync screen
 */
import Storage from './storage.js';
import Sync from './sync.js';

const Settings = {
    init: () => {
        Settings.loadSettings();
        Settings.setupEventListeners();
        Settings.updateSyncStatus();
    },

    loadSettings: () => {
        const settings = Storage.getSettings();
        document.getElementById('sheet-url').value = settings.sheetUrl || '';
    },

    updateSyncStatus: () => {
        const lastSync = Storage.getLastSync();
        const statusText = document.querySelector('.text-xs.text-on-surface-variant');
        if (lastSync && statusText) {
            statusText.innerText = `Last synced: ${lastSync}`;
        }
    },

    setupEventListeners: () => {
        // Sync Button
        const syncBtn = document.querySelector('button.bg-secondary-container');
        syncBtn.addEventListener('click', async () => {
            const url = document.getElementById('sheet-url').value;
            if (!url) {
                alert('Please enter a Google Sheet URL');
                return;
            }

            // Save settings first
            const settings = Storage.getSettings();
            settings.sheetUrl = url;
            Storage.saveSettings(settings);

            // Trigger Sync
            syncBtn.disabled = true;
            syncBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">sync</span> Syncing...';
            
            try {
                await Sync.syncWithSheet();
                Settings.updateSyncStatus();
                alert('Sync successful!');
            } catch (error) {
                alert('Sync failed: ' + error.message);
            } finally {
                syncBtn.disabled = false;
                syncBtn.innerHTML = '<span class="material-symbols-outlined" data-icon="sync">sync</span> Sync Now';
            }
        });

        // Clear Storage Button
        const clearBtn = document.querySelector('button.text-error');
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all local data? This cannot be undone.')) {
                Storage.saveContacts([]);
                alert('Data cleared.');
                window.location.reload();
            }
        });

        // Bottom Nav Redirection
        const navLinks = document.querySelectorAll('nav a');
        navLinks[0].href = 'lists.html';
        navLinks[1].href = 'settings.html';
        navLinks[2].href = 'settings.html';
    }
};

document.addEventListener('DOMContentLoaded', Settings.init);
