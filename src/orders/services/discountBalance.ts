import { prisma } from "../../../prisma/db"


export const discountBalance = async (obj: any) => {

    await prisma.balanceHistory.create({
        data: obj,
    })
    return true
}