import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Register Fonts
Font.register({
    family: 'Neue Machina',
    fonts: [
        { src: '/assets/fonts/NeueMachina-Regular.otf' },
        { src: '/assets/fonts/NeueMachina-Ultrabold.otf', fontWeight: 'bold' },
        { src: '/assets/fonts/NeueMachina-Light.otf', fontWeight: 'light' },
    ],
});

const styles = StyleSheet.create({
    page: {
        padding: 60,
        backgroundColor: '#000000',
        color: '#ffffff',
        fontFamily: 'Neue Machina',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 60,
    },
    logoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    hero: {
        marginBottom: 80,
    },
    eyebrow: {
        color: '#C8F55A',
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 30,
        lineHeight: 1,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 30,
        color: '#ffffff',
    },
    section: {
        marginBottom: 60,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    card: {
        backgroundColor: '#131313',
        padding: 30,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    pricingCard: {
        backgroundColor: '#131313',
        padding: 40,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    pricingCardHighlighted: {
        borderColor: 'rgba(200, 245, 90, 0.3)',
    },
    priceBox: {
        backgroundColor: '#1a1a1a',
        padding: 30,
        textAlign: 'center',
        width: 200,
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    priceSubtitle: {
        fontSize: 8,
        color: '#666666',
        letterSpacing: 2,
    },
    quote: {
        borderLeftWidth: 2,
        borderLeftColor: '#C8F55A',
        paddingLeft: 20,
        marginTop: 20,
    },
    quoteText: {
        color: '#C8F55A',
        fontSize: 14,
        fontStyle: 'italic',
    }
});

export const GradoClimaPDF = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <View style={styles.logoSection}>
                    <Text style={styles.logoText}>GrowthVideoLab</Text>
                </View>
                <Text style={{ fontSize: 10, color: '#666' }}>PROPUESTA COMERCIAL 2024</Text>
            </View>

            <View style={styles.hero}>
                <Text style={styles.eyebrow}>CLIENTE: GRADOCLIMA</Text>
                <Text style={styles.title}>CRECIMIENTO ESTRATÉGICO{'\n'}BASADO EN AUTORIDAD</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ASÍ SE VE EL CONTENIDO</Text>
                {[
                    { num: '01', title: 'VSL COMERCIAL', desc: 'Video de 1-3 minutos enfocado en convertir. Para mailings, LinkedIn y campañas. El administrador ve la cara de GradoClima antes de la primera reunión.', quote: '"¿Cuánto le está costando a tu edificio no tener mantención preventiva?"' },
                    { num: '02', title: 'PÍLDORAS DE AUTORIDAD', desc: 'Contenido corto (Reels/TikTok/Shorts) donde explicamos problemas comunes de calderas y climatización. Educamos al cliente para que vea a GradoClima como el experto.', quote: '"El 80% de las fallas críticas ocurren por falta de lubricación en piezas que nadie revisa."' },
                    { num: '03', title: 'CASOS DE ÉXITO', desc: 'Entrevistas cortas o testimonios de administradores que ya confían en ustedes. La prueba social que cierra la venta sin que ustedes tengan que decir nada.', quote: '"Desde que llegó GradoClima, las quejas de los copropietarios por el agua caliente desaparecieron."' },
                ].map((item, i) => (
                    <View key={i} style={{ marginBottom: 40 }}>
                        <Text style={{ color: '#C8F55A', fontSize: 24, fontWeight: 'bold' }}>{item.num}</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 10 }}>{item.title}</Text>
                        <Text style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{item.desc}</Text>
                        <View style={styles.quote}>
                            <Text style={styles.quoteText}>{item.quote}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.section} break>
                <Text style={styles.sectionTitle}>PLAN DE TRABAJO</Text>

                {/* Setup Card */}
                <View style={styles.pricingCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.eyebrow}>INVERSIÓN INICIAL</Text>
                            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>SETUP ESTRATÉGICO</Text>
                            <Text style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>• Auditoría de presencia digital actual</Text>
                            <Text style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>• Guión y Producción de VSL Comercial</Text>
                            <Text style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>• Creación de Landing Page de Conversión</Text>
                        </View>
                        <View style={styles.priceBox}>
                            <Text style={styles.price}>$775.000</Text>
                            <Text style={styles.priceSubtitle}>CLP · PAGO ÚNICO</Text>
                        </View>
                    </View>
                </View>

                {/* Monthly Card */}
                <View style={[styles.pricingCard, styles.pricingCardHighlighted]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.eyebrow}>SERVICIO FEED MENSUAL</Text>
                            <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20 }}>PARTNER ESTRATÉGICO</Text>
                            <Text style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>• 2 Jornadas de grabación mensuales</Text>
                            <Text style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>• Edición de 12 a 15 piezas de contenido</Text>
                            <Text style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>• Gestión de pauta en LinkedIn/Meta (Ads)</Text>
                        </View>
                        <View style={styles.priceBox}>
                            <Text style={styles.price}>$950.000</Text>
                            <Text style={styles.priceSubtitle}>CLP / MES</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);
