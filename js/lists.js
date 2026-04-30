/**
 * lists.js - Logic for the contact list screen
 */
import Storage from './storage.js';
import Utils from './utils.js';

const Lists = {
    init: () => {
        Lists.renderContacts();
        Lists.setupEventListeners();
        Lists.renderCategories();
    },

    renderContacts: (filter = '', category = 'All') => {
        const contactsContainer = document.querySelector('.space-y-stack-md');
        const contacts = Storage.getContacts();
        
        const filteredContacts = contacts.filter(c => {
            const matchesSearch = c.name.toLowerCase().includes(filter.toLowerCase()) || 
                                 c.phone.includes(filter) ||
                                 c.position.toLowerCase().includes(filter.toLowerCase());
            const matchesCategory = category === 'All' || c.category === category;
            return matchesSearch && matchesCategory;
        });

        if (filteredContacts.length === 0) {
            contactsContainer.innerHTML = `
                <div class="flex flex-col items-center justify-center py-20 text-on-surface-variant">
                    <span class="material-symbols-outlined text-6xl mb-4">search_off</span>
                    <p class="font-body-lg">No contacts found</p>
                </div>
            `;
            return;
        }

        contactsContainer.innerHTML = filteredContacts.map(contact => `
            <div class="flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:shadow-sm transition-all h-[80px] cursor-pointer" 
                 onclick="window.location.href='details.html?id=${contact.id}'">
                <div class="w-12 h-12 rounded-full mr-4 bg-primary-fixed flex items-center justify-center flex-shrink-0 text-primary-container font-bold">
                    ${contact.name.substring(0, 2).toUpperCase()}
                </div>
                <div class="flex-grow min-w-0">
                    <h3 class="font-headline-md text-body-lg text-on-surface truncate">${contact.name}</h3>
                    <p class="font-body-md text-sm text-on-surface-variant">${contact.position} ${contact.school ? '@ ' + contact.school : ''}</p>
                </div>
                <button class="ml-4 w-12 h-12 flex items-center justify-center bg-[#25D366] text-white rounded-full hover:opacity-90 transition-opacity"
                        onclick="event.stopPropagation(); window.open('${Utils.formatWhatsAppLink(contact.phone)}', '_blank')">
                    <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">chat</span>
                </button>
            </div>
        `).join('');
    },

    renderCategories: () => {
        const categoriesContainer = document.querySelector('.flex.gap-stack-sm');
        const contacts = Storage.getContacts();
        const categories = ['All', ...new Set(contacts.map(c => c.category))].filter(Boolean);

        categoriesContainer.innerHTML = categories.map(cat => `
            <button class="category-chip whitespace-nowrap px-6 py-2 ${cat === 'All' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container-highest text-on-surface-variant'} rounded-xl font-label-bold text-sm transition-colors"
                    data-category="${cat}">
                ${cat}
            </button>
        `).join('');

        // Re-attach listeners for new chips
        document.querySelectorAll('.category-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const selectedCat = e.target.dataset.category;
                
                // Update UI
                document.querySelectorAll('.category-chip').forEach(c => {
                    c.classList.remove('bg-secondary-container', 'text-on-secondary-container');
                    c.classList.add('bg-surface-container-highest', 'text-on-surface-variant');
                });
                e.target.classList.add('bg-secondary-container', 'text-on-secondary-container');
                e.target.classList.remove('bg-surface-container-highest', 'text-on-surface-variant');

                const searchVal = document.querySelector('input[type="text"]').value;
                Lists.renderContacts(searchVal, selectedCat);
            });
        });
    },

    setupEventListeners: () => {
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('input', (e) => {
            const activeCategory = document.querySelector('.category-chip.bg-secondary-container').dataset.category;
            Lists.renderContacts(e.target.value, activeCategory);
        });

        // Bottom Nav Redirection
        const navLinks = document.querySelectorAll('nav a');
        navLinks[0].href = 'lists.html';
        navLinks[1].href = 'settings.html'; // Assuming Import is in Settings or its own page
        navLinks[2].href = 'settings.html';
    }
};

document.addEventListener('DOMContentLoaded', Lists.init);
