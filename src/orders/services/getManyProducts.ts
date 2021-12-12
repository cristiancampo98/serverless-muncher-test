import { prisma } from "../../../prisma/db"
export const getManyProducts = async (data: any) => {
    let ids: any[] = []
    data.forEach((element: { productId: any; }) => {
        ids.push(element.productId)
    });
    const products = await prisma.product.findMany({
        where: {
            id: { in: ids }
        }
    })
    if (products.length) {
        return products
    }
    return false
}