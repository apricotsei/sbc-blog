//記事一覧の記載　カードコンポーネント(PostCard.tsxで表示)

export type Post = {      //ts用
    id: string
    title: string
    content: string
    topImage: string | null
    createdAt: Date
    author: {
        name: string
    }
}

export type PostCardProps = { post: Post }