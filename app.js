// const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

// const QRPortalWeb = require('@bot-whatsapp/portal')
// const BaileysProvider = require('@bot-whatsapp/provider/baileys')
// const MockAdapter = require('@bot-whatsapp/database/mock')
// const { makeWASocket, MemoryAuthState } = require('@whiskeysockets/baileys')
// //const { Client, NoAuth } = require('@bot-whatsapp/provider/baileys'); // Importa NoAuth

// const {searchValueInSheet} = require("./utils")


// const flowPrincipal = addKeyword(['rcrs'])
//     .addAnswer('🦇 Hola y bienvenid@ a Tesorería Resis Sur')
//     .addAnswer('Para ver el detalle de tu cuota, por favor ingresá tu N° de DNI (Sin puntos):', {capture: true},
//         async (ctx, {flowDynamic, fallBack}) => {
//             if (ctx.body.includes('.')){
//                 await flowDynamic('❌El DNI ingresado contiene puntos, por favor volvé a ingresar❌')
//                 return fallBack()
//             }else{
//                 const response = await searchValueInSheet("Hoja 1", ctx.body);
//                 if (response != null){
//                     await flowDynamic([`*${response.nombre}* te detallamos tu resumen de cuotas:`, `🧑 Condición: ${response.condicion}`,
//                         `💰 Meses adeudados: ${response.meses}`, `🔢 Cantidad: ${response.cantidad}`, `💲 Total: ${response.total} `, `⏳ Estado actual: ${response.estado}`, 
//                         `📅 Fecha de actualización: ${response.fecha_act}`
//                     ])
//                 } else {
//                     await flowDynamic('❌El DNI ingresado es incorrecto, por favor volvé a ingresar❌')
//                     return fallBack()
//                 }
//             }
//         }
//     )

// const main = async () => {
//     const authState = MemoryAuthState();
//     const adapterDB = new MockAdapter()
//     const adapterFlow = createFlow([flowPrincipal])
//     //const adapterProvider = createProvider(BaileysProvider)
//     const adapterProvider = createProvider(BaileysProvider, {
//         auth: authState, // Asegúrate de que no haya una sesión persistente
//         session: null // No almacenar sesión
//     });

//     createBot({
//         flow: adapterFlow,
//         provider: adapterProvider,
//         database: adapterDB,
//     })

//     QRPortalWeb()
// }

// main()


const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const { searchValueInSheet } = require("./utils");

// Adaptador personalizado para no almacenar la autenticación
const authState = {
    creds:undefined,
    // creds: {
    //     noiseKey: undefined,
    //     signedIdentityKey: undefined,
    //     signedPreKey: undefined,
    //     registrationId: undefined,
    //     advSecretKey: undefined,
    //     nextPreKeyId: 1,
    //     firstUnuploadedPreKeyId: 1,
    //     serverHasPreKeys: true,
    //     account: undefined,
    //     me: { id: 'YOUR_PHONE_NUMBER@s.whatsapp.net', name: 'Tesorería Resis Sur' },
    //     signalIdentities: [],
    //     lastAccountSyncTimestamp: undefined,
    //     myAppStateKeyId: undefined
    // },
    keys: {
        preKeys: {},
        sessions: {},
        senderKeys: {},
        appStateSyncKeys: {},
        appStateVersions: {},
        senderKeyMemory: {},
    },
    saveCreds: () => {}, // No hace nada, no persiste datos
    loadCreds: () => {}, // No hace nada, no persiste datos
};

const flowPrincipal = addKeyword(['rcrs'])
    .addAnswer('🦇 Hola y bienvenid@ a Tesorería Resis Sur')
    .addAnswer('Para ver el detalle de tu cuota, por favor ingresá tu N° de DNI (Sin puntos):', { capture: true },
        async (ctx, { flowDynamic, fallBack }) => {
            if (ctx.body.includes('.')) {
                await flowDynamic('❌El DNI ingresado contiene puntos, por favor volvé a ingresar❌');
                return fallBack();
            } else {
                const response = await searchValueInSheet("Hoja 1", ctx.body);
                if (response != null) {
                    await flowDynamic([`*${response.nombre}* te detallamos tu resumen de cuotas:`, `🧑 Condición: ${response.condicion}`,
                        `💰 Meses adeudados: ${response.meses}`, `🔢 Cantidad: ${response.cantidad}`, `💲 Total: ${response.total} `, `⏳ Estado actual: ${response.estado}`,
                        `📅 Fecha de actualización: ${response.fecha_act}`
                    ]);
                } else {
                    await flowDynamic('❌El DNI ingresado es incorrecto, por favor volvé a ingresar❌');
                    return fallBack();
                }
            }
        }
    );

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal]);
    const adapterProvider = createProvider(BaileysProvider, {
        auth: authState, // Utilizar el adaptador de autenticación personalizado
        session: null // No almacenar sesión
    });
    
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
}

main();
