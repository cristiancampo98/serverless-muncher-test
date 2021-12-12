import { prisma } from "../../../prisma/db"

export const create = async (input: any) => {
    let response = null,
        message = null,
        code = 200
    try {
        const body = JSON.parse(input.body)

        response = await prisma.product.create({
            data: body,
        })
        message = 'Proceso realizado'

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