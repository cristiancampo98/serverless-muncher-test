import { prisma } from "../../../prisma/db";
export const getBalanceByUser = async (input: any) => {
    let response = null,
        code = 200,
        message = null
    try {
        const { pathParameters } = input
        let resultado = 0
        const balance = await prisma.balanceHistory.groupBy({
            by: ['type'],
            where: {
                userId: Number(pathParameters.userId)
            },
            _sum: {
                quantity: true
            },
        })
        if (balance.length) {
            let positive = balance.find(data => data.type)
            let negative = balance.find(data => !data.type)

            if (negative) {
                resultado = positive._sum.quantity - negative._sum.quantity
            } else {
                resultado = positive._sum.quantity
            }
            response = {
                balance: resultado
            }
            message = 'Proceso realizado'
        } else {
            response = []
            message = 'No se encontró información'
        }

    } catch (error: any) {
        response = error.message
        code = 500
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