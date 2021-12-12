import { prisma } from "../../../prisma/db";

export const findOne = async (input: any) => {
    let response = null
    let message = null
    const { pathParameters } = input
    response = await prisma.user.findUnique({
        where: {
            id: Number(pathParameters.id)
        },
        include: {
            BalanceHistory: {
                select: {
                    quantity: true,
                    type: true,
                }
            },
            Order: {
                include: {
                    OrderDetail: true
                }
            },
        },
    })
    if (response != null) {
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