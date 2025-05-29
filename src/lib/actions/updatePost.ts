'use server'
import { postSchema } from "@/validations/post"
import { saveImage } from "@/utils/image"
import { prisma } from '@/lib/prisma'

type ActionState = {
    success: boolean,
    errors: Record<string, string[]>  //nameとemailをまとめる
}

export async function updatePost(
    prevState: ActionState,
    formData:FormData
): Promise<ActionState>{

    try{
        //フォームの情報を取得
        const title = formData.get('title') as string
        const content = formData.get('content') as string
        const topImageInput = formData.get('topImage')
        const topImage = topImageInput instanceof File ? topImageInput : null
        const postId = formData.get('postId') as string
        const published = formData.get('published') === 'true'
        const oldImageUrl = formData.get('oldImageUrl') as string
    
        //バリデーション
        const validationResult = postSchema.safeParse({ title, content, topImage })
        if(!validationResult.success){
            return { 
                success: false,
                errors: validationResult.error.flatten().fieldErrors
            }
        }
    
        //画像保存
        let imageUrl = oldImageUrl
        if(topImage instanceof File && topImage.size > 0 && topImage.name !== 'undefined'){
            const newImageUrl = await saveImage(topImage)
            if(!newImageUrl){
                return {
                    success: false,
                    errors: { topImage: ['画像の保存に失敗しました']}
                }
            }
            imageUrl = newImageUrl
        }
    
        //DB更新保存

        await prisma.post.update({
            where: {id: postId},
            data: {
                title,
                content,
                published,
                topImage: imageUrl,
            }
        })

        //redirect('/dashboard')
        
        return{
            success: true,
            errors: {}
        }

    }catch(err){
        console.log("createPost エラー:", err)
        return {
            success: false,
            errors: {
                unknown: ['サーバーエラーが発生しました']
            }
        }
    }
}