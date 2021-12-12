const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@prisma.io',

        },
    })

}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })