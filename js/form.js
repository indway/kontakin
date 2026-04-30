/**
 * form.js - Logic for the Add/Edit contact form
 */
import Storage from './storage.js';
import Utils from './utils.js';

const Form = {
    init: () => {
        const id = Utils.getParam('id');
        const title = document.querySelector('h1');
        
        if (id) {
            const contact = Storage.getContactById(id);
            if (contact) {
                title.innerText = 'Edit Contact';
                Form.fillForm(contact);
            }
        } else {
            title.innerText = 'Add Contact';
        }

        Form.setupEventListeners(id);
    },

    fillForm: (contact) => {
        const inputs = document.querySelectorAll('input');
        inputs[0].value = contact.name || '';
        inputs[1].value = contact.phone || '';
        inputs[2].value = contact.position || '';
        inputs[3].value = contact.school || '';
        
        // Select Category/Tag (simplified to first tag for now)
        if (contact.category) {
            const tags = document.querySelectorAll('.flex.flex-wrap.gap-2 span');
            tags.forEach(tag => {
                if (tag.innerText === contact.category) {
                    tag.classList.add('bg-secondary-fixed', 'text-on-secondary-fixed-variant');
                    tag.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
                } else {
                    tag.classList.remove('bg-secondary-fixed', 'text-on-secondary-fixed-variant');
                    tag.classList.add('bg-surface-container-high', 'text-on-surface-variant');
                }
            });
        }
    },

    setupEventListeners: (id) => {
        const form = document.querySelector('form');
        const inputs = document.querySelectorAll('input');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const selectedTag = document.querySelector('.bg-secondary-fixed')?.innerText || 'General';

            const contactData = {
                name: inputs[0].value,
                phone: inputs[1].value,
                position: inputs[2].value,
                school: inputs[3].value,
                category: selectedTag
            };

            if (id) {
                Storage.updateContact(id, contactData);
                alert('Contact updated!');
            } else {
                Storage.addContact(contactData);
                alert('Contact added!');
            }

            window.location.href = 'lists.html';
        });

        // Tag selection logic
        const tags = document.querySelectorAll('.flex.flex-wrap.gap-2 span');
        tags.forEach(tag => {
            tag.classList.add('cursor-pointer');
            tag.addEventListener('click', () => {
                tags.forEach(t => {
                    t.classList.remove('bg-secondary-fixed', 'text-on-secondary-fixed-variant');
                    t.classList.add('bg-surface-container-high', 'text-on-surface-variant');
                });
                tag.classList.add('bg-secondary-fixed', 'text-on-secondary-fixed-variant');
                tag.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
            });
        });

        // Cancel Button
        const cancelBtn = document.querySelector('button[type="button"]');
        cancelBtn.addEventListener('click', () => {
            window.history.back();
        });

        // Back Arrow
        document.querySelector('header button').addEventListener('click', () => {
            window.history.back();
        });

        // Bottom Nav Redirection
        const navLinks = document.querySelectorAll('nav a');
        navLinks[0].href = 'lists.html';
        navLinks[1].href = 'settings.html';
        navLinks[2].href = 'settings.html';
    }
};

document.addEventListener('DOMContentLoaded', Form.init);
