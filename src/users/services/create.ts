import { prisma } from "../../../prisma/db";
async function findByEmail(email: string) {
    const result = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (result != null) {
        return true
    }
    return false
}
export const create = async (input: any) => {
    try {
        const body = JSON.parse(input.body)
        const exist = await findByEmail(body.email)
        if (exist) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Email already exists!'
                }),
            }
        }
        const response = await prisma.user.create({
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
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify(
                {
                    body: error.message,
                    message: 'Ocurrió un error',
                },
                null,
                2
            ),
        };
    }
}