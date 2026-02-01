/// <reference types="vite/client" />

// Webhook URLs are now proxied through Nginx (/api/n8n/*) 
// to hide the actual n8n domain from the browser.
export const N8N_WEBHOOKS = {
    EBOOKS: '/api/n8n/ebooks-download',
    WEB_PORTFOLIO: '/api/n8n/web-portfolio-lead',
    LEAD_FORM: '/api/n8n/detailed-lead-form',
    CONTACT: '/api/n8n/general-contact',
};
