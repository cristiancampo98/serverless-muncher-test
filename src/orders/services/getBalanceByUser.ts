import { prisma } from "../../../prisma/db"
export const getBalanceByUser = async (id: number) => {
    let resultado = 0
    const balance = await prisma.balanceHistory.groupBy({
        by: ['type'],
        where: {
            userId: id
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
    } else {
        resultado = 0
    }
    return resultado
}