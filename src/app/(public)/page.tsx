//検索画面(詳細ページや検索機能)

import { getPosts,searchPosts } from "@/lib/post"
import PostCard from "@/components/post/PostCard"
import { Post } from '@/types/post'

type SearchParams = {
  search? : string
}

export default async function Postspage(
  {searchParams}:{searchParams: Promise<SearchParams>}) {

    const resolvedSearchParams = await searchParams
    const query = resolvedSearchParams.search || ''

    //検索されたものを表示
    const posts = query
    ? await searchPosts(query) as Post[]
    : await getPosts() as Post[]


    //データベースから情報を取得(記事一覧)
    //const posts = await getPosts() as Post[]

  return (
    //フラグメント
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
      </div>
    </>
  )
}