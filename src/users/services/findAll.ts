import { prisma } from "../../../prisma/db";
export const findAll = async () => {
    let message = null
    const response = await prisma.user.findMany({
        include: {
            _count: {
                select: {
                    BalanceHistory: true,
                    Order: true,
                }
            }
        },
    })
    if (response.length) {
        message = 'Proceso realizado'
    } else {
        message = 'No se encontró información'
    }
    return {
        statusCode: 200,
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