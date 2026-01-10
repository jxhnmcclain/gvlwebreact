import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, CheckCircle, ChevronDown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { N8N_WEBHOOKS } from '../lib/config';
import TurnstileWidget from '../components/TurnstileWidget';

type FormState = {
    // Required
    nameAndCompany: string;
    businessDescription: string;
    websiteStatus: string;
    websiteGoal: string;
    contactInfo: string;

    // Optional
    brandIdentity: string;
    brandPersonality: string[];
    materials: string[];
    inspiration: string;
    budget: string;
};

const LeadFormPage = () => {
    const [formData, setFormData] = useState<FormState>({
        nameAndCompany: '',
        businessDescription: '',
        websiteStatus: '',
        websiteGoal: '',
        contactInfo: '',
        brandIdentity: '',
        brandPersonality: [],
        materials: [],
        inspiration: '',
        budget: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>> & { turnstile?: string }>({});
    const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof FormState]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleMultiSelect = (field: 'brandPersonality' | 'materials', value: string) => {
        setFormData(prev => {
            const current = prev[field];
            const exists = current.includes(value);
            if (exists) {
                return { ...prev, [field]: current.filter(item => item !== value) };
            } else {
                return { ...prev, [field]: [...current, value] };
            }
        });
    };

    const validate = () => {
        const newErrors: Partial<Record<keyof FormState, string>> & { turnstile?: string } = {};
        let isValid = true;

        if (!formData.nameAndCompany.trim()) { newErrors.nameAndCompany = "Este campo es obligatorio"; isValid = false; }
        if (!formData.businessDescription.trim()) { newErrors.businessDescription = "Cuéntanos de qué trata tu negocio"; isValid = false; }
        if (!formData.websiteStatus) { newErrors.websiteStatus = "Selecciona una opción"; isValid = false; }
        if (!formData.websiteGoal) { newErrors.websiteGoal = "Selecciona un objetivo principal"; isValid = false; }
        if (!formData.contactInfo.trim()) { newErrors.contactInfo = "Necesitamos un medio para contactarte"; isValid = false; }
        if (!turnstileToken) { newErrors.turnstile = "Por favor verifica que no eres un robot"; isValid = false; }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) {
            // Scroll to top error
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            await fetch(N8N_WEBHOOKS.LEAD_FORM, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, turnstileToken })
            });
        } catch (error) {
            console.error('Error sending form:', error);
        }

        // Simulate delay for UX
        setTimeout(() => {
            console.log("Lead Form POSTed to n8n:", formData);
            setIsSubmitting(false);
            setIsSuccess(true);
            window.scrollTo(0, 0);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gvl-yellow flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white border-2 border-black rounded-[2.5rem] p-12 md:p-16 shadow-[8px_8px_0px_0px_black] max-w-2xl w-full"
                >
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 bg-gvl-green rounded-full flex items-center justify-center border-2 border-black">
                            <Check size={48} className="text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tight">¡Recibido!</h1>
                    <p className="text-xl text-gray-700 mb-8">
                        Gracias por tomarte el tiempo de completar el formulario. Hemos recibido tu información y nuestro equipo la analizará para prepararte una propuesta a medida.
                    </p>
                    <p className="font-bold text-lg mb-8">Te contactaremos en las próximas 24-48 horas hábiles.</p>

                    <Link to="/" className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                        Volver al sitio principal
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gvl-cream font-sans selection:bg-gvl-yellow selection:text-black">
            {/* Minimal Header */}
            <header className="fixed top-0 w-full bg-gvl-cream/90 backdrop-blur-md border-b border-black z-50 py-4 px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Star className="fill-black w-6 h-6" />
                    <span className="font-black text-xl tracking-tight">GVL | Cotización Web</span>
                </div>
            </header>

            <main className="pt-32 pb-24 px-4 md:px-8 max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-[0.9]">
                        Vamos a crear algo <br /> <span className="text-gvl-blue underline decoration-4 decoration-gvl-yellow">Increíble</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Completa este formulario para ayudarnos a entender tu visión. Cuantos más detalles nos des, más precisa será nuestra propuesta.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">

                    {/* SECCIÓN OBLIGATORIA */}
                    <section className="bg-white border-2 border-black rounded-[2rem] p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-black"></div>
                        <div className="mb-8 flex items-center gap-3">
                            <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Paso 1</span>
                            <h2 className="text-2xl font-bold uppercase">Lo Esencial (Obligatorio)</h2>
                        </div>

                        <div className="space-y-8">
                            {/* Pregunta 1 */}
                            <div className="group">
                                <label className="block text-lg font-bold mb-3 uppercase tracking-wide">
                                    Nombre y empresa <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="nameAndCompany"
                                    value={formData.nameAndCompany}
                                    onChange={handleTextChange}
                                    placeholder="Ej: Juan Pérez - JP Arquitectura"
                                    className={`w-full bg-gvl-cream border-2 rounded-xl p-4 text-lg font-medium outline-none focus:ring-4 focus:ring-gvl-yellow/50 transition-all ${errors.nameAndCompany ? 'border-red-500' : 'border-black'}`}
                                />
                                {errors.nameAndCompany && <p className="text-red-500 text-sm mt-1 font-bold">{errors.nameAndCompany}</p>}
                            </div>

                            {/* Pregunta 2 */}
                            <div className="group">
                                <label className="block text-lg font-bold mb-3 uppercase tracking-wide">
                                    ¿De qué trata tu negocio? <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    name="businessDescription"
                                    value={formData.businessDescription}
                                    onChange={handleTextChange}
                                    rows={4}
                                    placeholder="Describe brevemente qué hace tu empresa, qué productos/servicios ofreces y a quién te diriges..."
                                    className={`w-full bg-gvl-cream border-2 rounded-xl p-4 text-lg font-medium outline-none focus:ring-4 focus:ring-gvl-yellow/50 transition-all resize-none ${errors.businessDescription ? 'border-red-500' : 'border-black'}`}
                                />
                                {errors.businessDescription && <p className="text-red-500 text-sm mt-1 font-bold">{errors.businessDescription}</p>}
                            </div>

                            {/* Pregunta 3 - Radio */}
                            <div className="group">
                                <label className="block text-lg font-bold mb-3 uppercase tracking-wide">
                                    ¿Actualmente tienes un sitio web? <span className="text-red-500">*</span>
                                </label>
                                <div className="grid gap-3">
                                    {["Sí, y quiero rediseñarlo", "Sí, pero quiero uno completamente nuevo", "No, este será mi primer sitio web"].map((opt) => (
                                        <label key={opt} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${formData.websiteStatus === opt ? 'border-gvl-blue bg-blue-50' : 'border-gray-200'}`}>
                                            <input
                                                type="radio"
                                                name="websiteStatus"
                                                value={opt}
                                                checked={formData.websiteStatus === opt}
                                                onChange={handleTextChange}
                                                className="w-5 h-5 text-black focus:ring-black"
                                            />
                                            <span className="font-medium">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.websiteStatus && <p className="text-red-500 text-sm mt-1 font-bold">{errors.websiteStatus}</p>}
                            </div>

                            {/* Pregunta 4 - Radio/Select */}
                            <div className="group">
                                <label className="block text-lg font-bold mb-3 uppercase tracking-wide">
                                    Objetivo principal del sitio web <span className="text-red-500">*</span>
                                </label>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {[
                                        "Generar ventas online",
                                        "Captar leads/contactos",
                                        "Mostrar portafolio/trabajos",
                                        "Informar sobre servicios",
                                        "Construir presencia de marca",
                                        "Otro"
                                    ].map((opt) => (
                                        <label key={opt} className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${formData.websiteGoal === opt ? 'border-gvl-green bg-green-50' : 'border-gray-200'}`}>
                                            <input
                                                type="radio"
                                                name="websiteGoal"
                                                value={opt}
                                                checked={formData.websiteGoal === opt}
                                                onChange={handleTextChange}
                                                className="w-5 h-5 text-black focus:ring-black"
                                            />
                                            <span className="font-medium">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                                {errors.websiteGoal && <p className="text-red-500 text-sm mt-1 font-bold">{errors.websiteGoal}</p>}
                            </div>

                            {/* Pregunta 5 */}
                            <div className="group">
                                <label className="block text-lg font-bold mb-3 uppercase tracking-wide">
                                    Email y teléfono de contacto <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="contactInfo"
                                    value={formData.contactInfo}
                                    onChange={handleTextChange}
                                    placeholder="Email / WhatsApp"
                                    className={`w-full bg-gvl-cream border-2 rounded-xl p-4 text-lg font-medium outline-none focus:ring-4 focus:ring-gvl-yellow/50 transition-all ${errors.contactInfo ? 'border-red-500' : 'border-black'}`}
                                />
                                {errors.contactInfo && <p className="text-red-500 text-sm mt-1 font-bold">{errors.contactInfo}</p>}
                            </div>
                        </div>
                    </section>

                    {/* SECCIÓN OPCIONAL */}
                    <section className="bg-white border-2 border-gray-200 rounded-[2rem] p-6 md:p-10 relative overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
                        <div className="mb-8 flex items-center gap-3">
                            <span className="bg-gray-200 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">Paso 2</span>
                            <h2 className="text-2xl font-bold uppercase text-gray-800">Detalles del Proyecto (Opcional)</h2>
                        </div>

                        <div className="space-y-8">
                            {/* Identidad Visual */}
                            <div className="group">
                                <label className="block text-lg font-bold mb-3 uppercase tracking-wide text-gray-700">
                                    ¿Tu marca ya tiene identidad visual?
                                </label>
                                <div className="grid gap-3">
                                    {[
                                        "Sí, tengo logo, colores y tipografías definidas",
                                        "Tengo solo logo",
                                        "Tengo algunas ideas pero nada formal",
                                        "No tengo nada, necesito ayuda con esto"
                                    ].map((opt) => (
                                        <label key={opt} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 ${formData.brandIdentity === opt ? 'border-black bg-gray-50' : 'border-gray-200'}`}>
                                            <input
                                                type="radio"
                                                name="brandIdentity"
                                                value={opt}
                                                checked={formData.brandIdentity === opt}
                                                onChange={handleTextChange}
                                                className="w-4 h-4"
                                            />
                                            <span className="text-gray-700">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Personalidad - Checkbox */}
                            <div className="group">
                                <label className="block text-lg font-bold mb-3 uppercase tracking-wide text-gray-700">
                                    ¿Cómo describirías la personalidad de tu marca?
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Profesional y corporativa",
                                        "Moderna y minimalista",
                                        "Creativa y atrevida",
                                        "Cálida y cercana",
                                        "Elegante y sofisticada",
                                        "Juvenil y dinámica",
                                        "Tradicional y confiable"
                                    ].map((opt) => {
                                        const isSelected = formData.brandPersonality.includes(opt);
                                        return (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => handleMultiSelect('brandPersonality', opt)}
                                                className={`px-4 py-2 rounded-full border-2 text-sm font-bold transition-all ${isSelected ? 'bg-black text-gvl-yellow border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Material Disponible - Checkbox */}
                            <div className="group">
                                <label className="block text-lg font-bold mb-3 uppercase tracking-wide text-gray-700">
                                    Material disponible
                                </label>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {[
                                        "Tengo fotos profesionales",
                                        "Tengo fotos pero no profesionales",
                                        "Tengo textos/descripciones",
                                        "Tengo videos/audiovisual",
                                        "Necesito sesión fotográfica",
                                        "No tengo nada aún"
                                    ].map((opt) => (
                                        <label key={opt} className="flex items-center gap-3 p-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.materials.includes(opt)}
                                                onChange={() => handleMultiSelect('materials', opt)}
                                                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                                            />
                                            <span className="text-gray-700">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Inspiración */}
                            <div className="group">
                                <label className="block text-lg font-bold mb-3 uppercase tracking-wide text-gray-700">
                                    Sitios web que te inspiran
                                </label>
                                <textarea
                                    name="inspiration"
                                    value={formData.inspiration}
                                    onChange={handleTextChange}
                                    rows={3}
                                    placeholder="Comparte 1-3 URLs de sitios que te gusten..."
                                    className="w-full bg-gvl-cream border-2 border-gray-200 rounded-xl p-4 text-base outline-none focus:border-black transition-all resize-none"
                                />
                            </div>

                            {/* Presupuesto */}
                            <div className="group">
                                <label className="block text-lg font-bold mb-3 uppercase tracking-wide text-gray-700">
                                    Presupuesto estimado y timeline
                                </label>
                                <div className="relative">
                                    <select
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleTextChange}
                                        className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 text-base appearance-none outline-none focus:border-black"
                                    >
                                        <option value="" disabled>Selecciona una opción</option>
                                        <option value="Menos de $500.000 CLP / Urgente">Menos de $500.000 CLP / Urgente (1-2 semanas)</option>
                                        <option value="$500.000 - $1.000.000 CLP / Normal">$500.000 - $1.000.000 CLP / Normal (3-4 semanas)</option>
                                        <option value="$1.000.000 - $2.000.000 CLP / Flexible">$1.000.000 - $2.000.000 CLP / Flexible (1-2 meses)</option>
                                        <option value="Más de $2.000.000 CLP / Sin apuro">Más de $2.000.000 CLP / Sin apuro (2+ meses)</option>
                                        <option value="Aún no lo sé, necesito cotización">Aún no lo sé, necesito cotización</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                                </div>
                            </div>

                        </div>
                    </section>


                    <div className="flex flex-col items-center justify-center pt-8 gap-4">
                        <div className={`${errors.turnstile ? 'p-1 border-2 border-red-500 rounded-md' : ''}`}>
                            <TurnstileWidget
                                onVerify={(token) => {
                                    setTurnstileToken(token);
                                    if (errors.turnstile) setErrors(prev => ({ ...prev, turnstile: undefined }));
                                }}
                            />
                        </div>
                        {errors.turnstile && <p className="text-red-500 font-bold">{errors.turnstile}</p>}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative bg-black text-white text-xl md:text-2xl font-black uppercase py-6 px-12 rounded-full hover:bg-gvl-yellow hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(255,255,255,0)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            <span className="flex items-center gap-3">
                                {isSubmitting ? "Enviando..." : "Enviar Formulario"}
                                {!isSubmitting && <ArrowRight className="group-hover:translate-x-1 transition-transform" size={28} />}
                            </span>
                        </button>
                    </div>

                </form>
            </main>
        </div>
    );
};

export default LeadFormPage;