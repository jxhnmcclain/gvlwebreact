import React from 'react';
import Turnstile from 'react-turnstile';

type TurnstileWidgetProps = {
    onVerify: (token: string) => void;
    onError?: (error: any) => void;
    theme?: 'light' | 'dark' | 'auto';
};

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ onVerify, onError, theme = 'light' }) => {
    const SITE_KEY = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY;

    if (!SITE_KEY) {
        console.error("Cloudflare Turnstile Site Key is missing in .env");
        return <div className="text-red-500 text-sm">Error: Captcha configuration missing.</div>;
    }

    return (
        <Turnstile
            sitekey={SITE_KEY}
            onVerify={onVerify}
            onError={onError}
            theme={theme as any}
        />
    );
};

export default TurnstileWidget;
