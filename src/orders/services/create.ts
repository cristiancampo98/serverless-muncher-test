import { prisma } from "../../../prisma/db"
import { getManyProducts } from "./getManyProducts"
import { getBalanceByUser } from "./getBalanceByUser"
import { discountBalance } from "./discountBalance"

async function findUser(id: number) {
    const result = await prisma.user.findUnique({
        where: {
            id
        }
    })
    if (result != null) {
        return true
    }
    return false
}

export const create = async (input: any) => {
    let response = null,
        message = null,
        code = 200,
        items = [],
        total = 0
    try {

        const body = JSON.parse(input.body)
        let user = await findUser(body.userId)
        if (!user) {
            code = 500
            response = 'No existe usuario'
            message = 'Ocurrió un error'
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

        const data = body.OrderDetail.create
        const products = await getManyProducts(data)
        if (!products) {
            code = 500
            response = 'No hay productos'
            message = 'Ocurrió un error'
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

        if (products) {
            for (let i = 0; i < products.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (products[i].id == data[j].productId) {
                        items.push(data[j])
                        if (data[j].quantity) {
                            total = total + (products[i].value * data[j].quantity)
                        } else {
                            total = total + (products[i].value * 1)
                        }



                    }
                }
            }
            const balance = await getBalanceByUser(body.userId)

            if (balance) {
                if (balance > total) {
                    await discountBalance({
                        quantity: total,
                        userId: body.userId,
                        type: false
                    })
                    const obj = {
                        userId: body.userId,
                        total,
                        OrderDetail: {
                            create: items
                        }
                    }
                    response = await prisma.order.create({
                        data: obj,
                    })
                    message = 'Proceso realizado'
                } else {
                    response = {
                        valueOrder: total,
                        valueBalance: balance
                    }
                    message = 'Balance insuficiente '
                }
            } else {
                response = {
                    valueOrder: total,
                    valueBalance: balance
                }
                message = 'Balance insuficiente '
            }
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