import Distance from "@/components/Distance";
import TitleHeader from "@/components/TitleHeader";
import { getPost } from "@/utils/DALs";
import { Ellipsis, Croissant, LeafyGreen, Ham } from "lucide-react";
import Image from "next/image";
import PostDistance from "@/components/PostDistance";
import { Suspense } from "react";
import Contact from "@/components/Contact";
import Button from "@/components/Button";

// Add revalidation for page-level caching
export const revalidate = 300; // Revalidate every 5 minutes

export default async function Post({ params }: { params: Promise<{ foodId: string }> }) {
  const resolvedParams = await params; // Resolve the Promise
  const foodId = resolvedParams.foodId; // Access foodId
  const categoryIcon = {
    "1": <Ham />,
    "2": <Croissant />,
    "3": <LeafyGreen />,
    "4": <Ellipsis />,
  };

  console.log(`Starting data fetch for post ${foodId}`);

  const post = await getPost(foodId);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Post Location
  const postLocation =
    post.user.latitude != null && post.user.longitude != null
      ? { latitude: post.user.latitude, longitude: post.user.longitude }
      : null;

  // Date Info
  const dateInfo = {
    created_at: new Date(post.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }),
    updated_at: new Date(post.updated_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }),
    exp_date: new Date(post.exp_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
  }




  return (
    <div className="Post min-h-[calc(100vh-10rem)] w-[25rem] mx-auto pt-[4rem] px-[1.5rem]">
      <TitleHeader title={post.name} />
      <div className="PostContainer">
        <div className="ProfileAndPic">
          <div className="PostImage w-full h-[30rem] bg-backgroundsecondary rounded-2xl mt-2">
            <Image src={post.image ?? ""} alt={post.name} width={924} height={689} className="object-cover 
                            rounded-2xl w-full h-full" />
          </div>
          <div className="ProfileWrapper flex items-center gap-2 mt-[1rem]">
            <div className="ProfileImage w-10 h-10 bg-backgroundsecondary rounded-full"></div>
            <h3 className="h3 text-textprimary">{post.user.name}</h3>
          </div>
        </div>

        <div className="PostInfo mt-[2rem] flex flex-col gap-[2rem] ">
          {/* PostHeader */}
          <div className="PostHeader ">
            <div className="PostName flex items-center gap-1">
              <h1>{post.name}</h1>
              <h1>
                {post.category && parseInt(post.category) !== 4
                  ? categoryIcon[post.category as keyof typeof categoryIcon]
                  : null}
              </h1>
            </div>

            <h2 className="text-makro">{!post.price ? "ฟรี" : post.price}</h2>
            <p className="p3 text-textsecondary">{post.description}</p>
          </div>

          {/* DateInfo */}
          <div className="DateInfo">
            <p className="p3 text-textsecondary">
              ✚ เพิ่มเข้าตู้เย็นเมื่อ {dateInfo.created_at}
            </p>
            <p className="p3 text-textsecondary">
              ✏️ อัปเดตล่าสุดเมื่อ {dateInfo.updated_at}
            </p>
            <p className="p3 text-textsecondary">🤢 จะบูดตอน {dateInfo.exp_date}</p>
          </div>

          {/* Contact */}
          <div className="Contact flex flex-col gap-[1rem] ">
            <Suspense fallback={<div className="p3 text-textsecondary">กำลังคำนวณระยะทาง...</div>}>
              <PostDistance postLocation={postLocation} />
            </Suspense>
            <Contact ig={post.user.instagram ?? undefined}
              line={post.user.line ?? undefined} phone={post.user.phone_number ?? undefined}
              facebook={post.user.facebook ?? undefined} align="start" />
          </div>


          {/* Button */}
          <Button type="button" text="รับอาหาร" className="mb-[1rem]" />

        </div>

      </div>
    </div>
  );
}