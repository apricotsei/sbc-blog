import { PrismaClient } from "@prisma/client";
import *as bcrypt from "bcryptjs"
const prisma = new PrismaClient()
async function main(){
    //クリーンアップ
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()

    //暗号化
    const hashedPassword = await bcrypt.hash('password123',12)   

    //ダミー画像
    const dummyImages = [
        '/images/post1.jpg',   
        '/images/post2.jpg'
    ]

    //ユーザー作
    const user = await prisma.user.create({
        data: {
            email: 'test@example.com',
            name: 'Test User',
            password: hashedPassword,
            posts: {
                create: [
                    {
                        title: '初めてのプログ投稿',
                        content: 'これは最初のブログ投稿です。',
                        topImage: dummyImages[0],
                        published: true,
                        createdAt: new Date()
                    },{
                        title: '2番目ののプログ投稿',
                        content: 'これは2つ目のブログ投稿です。',
                        topImage: dummyImages[1],
                        published: true,
                        createdAt: new Date()
                    }
                ]
            }
        }
    })
    console.log( { user } )
}

main()
    .catch((e) => {
        console.error(e) 
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
    