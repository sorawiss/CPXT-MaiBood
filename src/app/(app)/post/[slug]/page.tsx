import TitleHeader from "@/components/TitleHeader"
import { getPost } from "@/utils/DALs"

import { Ellipsis, Croissant, LeafyGreen, Ham } from 'lucide-react';




type PageProps = {
  params: { slug: string }
}

export default async function Post({ params }: PageProps) {
  const slug = await params.slug
  const post = await getPost(slug)
  const categoryIcon = {
    "1": <Ham />,
    "2": <Croissant />,
    "3": <LeafyGreen />,
    "4": <Ellipsis />
  }


  if (!post) {
    return <div>Post not found</div>
  }


  return (
    <div className="Post min-h-[calc(100vh-10rem)] w-[25rem] mx-auto pt-[4rem] px-[1.5rem] " >
      <TitleHeader title={post.name} />

      <div className="PostContainer">
        <div className="ProfileAndPic">
          <div className="PostImage w-full h-[30rem] bg-backgroundsecondary rounded-2xl mt-2 ">
          </div>

          <div className="ProfileWrapper flex items-center gap-2 mt-[1rem] ">
            <div className="ProfileImage w-10 h-10 bg-backgroundsecondary rounded-full "></div>
            <h3 className="h3 text-textprimary " >{post.user.name}</h3>
          </div>

        </div>

        <div className="PostInfo mt-[2rem] ">
          <div className="PostName flex items-center gap-1 ">
            <h1>{post.name}</h1>
            <h1>{post.category && parseInt(post.category) !== 4 ? categoryIcon[post.category as keyof typeof categoryIcon] : null}</h1>
          </div>
          <div className="PostPrice">
            <h2 className="text-makro  " >{!post.price ? "ฟรี" : post.price}</h2>
          </div>
          <p className="p3 text-textsecondary " >{post.description}</p>

        </div>


      </div>

    </div>
  )
}