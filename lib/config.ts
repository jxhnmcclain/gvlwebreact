/// <reference types="vite/client" />

export const N8N_WEBHOOKS = {
    EBOOKS: import.meta.env.VITE_N8N_EBOOKS_WEBHOOK || 'https://n8n.webhook.url/ebooks-download',
    WEB_PORTFOLIO: import.meta.env.VITE_N8N_WEB_PORTFOLIO_WEBHOOK || 'https://n8n.webhook.url/web-portfolio-lead',
    LEAD_FORM: import.meta.env.VITE_N8N_LEAD_FORM_WEBHOOK || 'https://n8n.webhook.url/detailed-lead-form',
    CONTACT: import.meta.env.VITE_N8N_CONTACT_WEBHOOK || 'https://n8n.webhook.url/general-contact',
};
