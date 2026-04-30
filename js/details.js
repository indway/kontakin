/**
 * details.js - Logic for the contact details screen
 */
import Storage from './storage.js';
import Utils from './utils.js';

const Details = {
    init: () => {
        const id = Utils.getParam('id');
        if (!id) {
            alert('No contact ID provided');
            window.location.href = 'lists.html';
            return;
        }

        const contact = Storage.getContactById(id);
        if (!contact) {
            alert('Contact not found');
            window.location.href = 'lists.html';
            return;
        }

        Details.renderContact(contact);
        Details.setupEventListeners(contact);
    },

    renderContact: (contact) => {
        // Hero Section
        document.querySelector('h2.text-on-background').innerText = contact.name;
        document.querySelector('p.text-on-surface-variant').innerText = contact.position;
        
        // Avatar Initial
        const avatarContainer = document.querySelector('.w-32.h-32');
        avatarContainer.innerHTML = `
            <div class="w-full h-full flex items-center justify-center bg-primary-fixed text-primary-container text-4xl font-bold">
                ${contact.name.substring(0, 2).toUpperCase()}
            </div>
        `;

        // Phone Section
        const phonePara = document.querySelector('.bg-white p.text-headline-md');
        phonePara.innerText = contact.phone;

        // School Section
        const schoolPara = document.querySelector('.bg-white p.text-body-lg.font-semibold');
        schoolPara.innerText = contact.school || 'General';
        
        // Category Badge
        const categoryBadge = document.querySelector('.inline-flex.bg-surface-container-high');
        categoryBadge.innerText = contact.category;

        // WhatsApp Link
        const waBtn = document.querySelector('button.bg-\\[\\#25D366\\]');
        waBtn.onclick = () => window.open(Utils.formatWhatsAppLink(contact.phone), '_blank');

        // Call Link
        const callBtn = document.querySelector('button.bg-secondary-container');
        callBtn.onclick = () => window.location.href = `tel:${contact.phone}`;
    },

    setupEventListeners: (contact) => {
        // Back Button
        document.querySelector('button .material-symbols-outlined:contains("arrow_back")')?.parentElement?.addEventListener('click', () => {
            window.location.href = 'lists.html';
        });
        
        // Alternative Back Button selection if the above fails
        document.querySelector('header button').addEventListener('click', () => {
            window.location.href = 'lists.html';
        });

        // Edit Button
        const editBtn = document.querySelectorAll('header button')[1];
        editBtn.addEventListener('click', () => {
            window.location.href = `form.html?id=${contact.id}`;
        });

        // Bottom Nav Redirection
        const navLinks = document.querySelectorAll('nav a');
        navLinks[0].href = 'lists.html';
        navLinks[1].href = 'settings.html';
        navLinks[2].href = 'settings.html';
    }
};

document.addEventListener('DOMContentLoaded', Details.init);
