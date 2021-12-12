import { prisma } from "../../../prisma/db";

export const create = async (input: any) => {
    const body = JSON.parse(input.body)

    const response = await prisma.balanceHistory.create({
        data: body,
    })
    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                body: response,
                message: 'Proceso realizado',
            },
            null,
            2
        ),
    };
}