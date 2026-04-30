/**
 * utils.js - Common utility functions
 */

const Utils = {
    /**
     * Formats phone number for WhatsApp wa.me link
     * Removes non-numeric characters and ensures it starts with country code
     */
    formatWhatsAppLink: (phone) => {
        if (!phone) return '#';
        let clean = phone.replace(/\D/g, '');
        if (clean.startsWith('0')) {
            clean = '62' + clean.slice(1); // Default to Indonesia if starts with 0
        }
        return `https://wa.me/${clean}`;
    },

    /**
     * Get URL parameters
     */
    getParam: (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    /**
     * Navigate to a screen
     */
    navigate: (screen, params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        const suffix = queryString ? `?${queryString}` : '';
        window.location.href = `${screen}.html${suffix}`;
    }
};

export default Utils;
