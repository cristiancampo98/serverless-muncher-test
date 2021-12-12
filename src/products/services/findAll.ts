import { prisma } from "../../../prisma/db"
export const findAll = async () => {
    let response = null,
        message = null,
        code = 200
    try {
        response = await prisma.product.findMany()
        if (response.length) {
            message = 'Proceso realizado'
        } else {
            message = 'No se encontró información'
        }

    } catch (error: any) {
        code = 500
        response = error.message
        message = 'Ocurrió un error'
    }
    return {
        statusCode: code,
        body: JSON.stringify(
            {
                body: response,
                message: message,
            },
            null,
            2
        ),
    };
}