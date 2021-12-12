import { prisma } from "../../../prisma/db"
export const findAll = async () => {
    let response = null,
        message = null,
        code = 200
    try {
        response = await prisma.order.findMany({
            include: {
                User: true,
                OrderDetail: {
                    include: {
                        Product: true
                    }
                }
            },
        })
        if (response.length) {
            message = 'Proceso realizado'
        } else {
            message = 'No se encontró información'
        }
    } catch (error: any) {
        response = error.message
        message = 'Ocurrió un error'
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