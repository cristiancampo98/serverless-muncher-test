import { prisma } from "../../../prisma/db";
export const findAll = async () => {
    let response = null,
        message = null,
        code = 200
    try {
        response = await prisma.balanceHistory.findMany({
            include: {
                User: true
            },
        })
        if (response.length) {
            message = 'Proceo realizado'
        } else {
            message = 'No se encontró información'
        }
    } catch (error: any) {
        response = error.message
        message = 'Ocurrió un error'
        code = 500
    }

    return {
        statusCode: code,
        body: JSON.stringify(
            {
                body: response,
                message,
            },
            null,
            2
        ),
    };
}