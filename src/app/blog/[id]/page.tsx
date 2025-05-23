type Params = {
    params : Promise<{
        id : string
    }>
}

export async function generaeteMetadata({params}: Params) {
    const {id} = await params
    return {
        title : `ブログ記事ID : ${id}です`
    }
}

//ページコンポーネント
export default async function BlogPage({params}: Params) {
    const {id} = await params
    return (
        <div>
            ブログID:{id}
        </div>
    )
}
