const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const {searchValueInSheet} = require("./utils")


const flowPrincipal = addKeyword(['rcrs'])
    .addAnswer('🦇 Hola y bienvenid@ a Tesorería Resis Sur')
    .addAnswer('Para ver el detalle de tu cuota, por favor ingresá tu N° de DNI (Sin puntos):', {capture: true},
        async (ctx, {flowDynamic, fallBack}) => {
            if (ctx.body.includes('.')){
                await flowDynamic('❌El DNI ingresado contiene puntos, por favor volvé a ingresar❌')
                return fallBack()
            }else{
                const response = await searchValueInSheet("Hoja 1", ctx.body);
                if (response != null){
                    await flowDynamic([`*${response.nombre}* te detallamos tu resumen de cuotas:`, `🧑 Condición: ${response.condicion}`,
                        `💰 Meses adeudados: ${response.meses}`, `🔢 Cantidad: ${response.cantidad}`, `💲 Total: ${response.total} `, `⏳ Estado actual: ${response.estado}`, 
                        `📅 Fecha de actualización: ${response.fecha_act}`
                    ])
                } else {
                    await flowDynamic('❌El DNI ingresado es incorrecto, por favor volvé a ingresar❌')
                    return fallBack()
                }
            }
        }
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
