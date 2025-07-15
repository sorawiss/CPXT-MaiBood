import Distance from "@/components/Distance";
import TitleHeader from "@/components/TitleHeader";
import { getPost } from "@/utils/DALs";
import { dateFormate } from "@/utils/date-formate";
import { getUserData } from "@/utils/user";
import { Ellipsis, Croissant, LeafyGreen, Ham } from "lucide-react";

export default async function Post({ params }: { params: Promise<{ foodId: string }> }) {
  const resolvedParams = await params; // Resolve the Promise
  const foodId = resolvedParams.foodId; // Access foodId
  const post = await getPost(foodId);
  const categoryIcon = {
    "1": <Ham />,
    "2": <Croissant />,
    "3": <LeafyGreen />,
    "4": <Ellipsis />,
  };

  if (!post) {
    return <div>Post not found</div>;
  }

  // Post Location
  const postLocation =
    post.user.latitude != null && post.user.longitude != null
      ? { latitude: post.user.latitude, longitude: post.user.longitude }
      : null;

  // User Location
  const user = await getUserData();
  const userLocation =
    user?.latitude != null && user?.longitude != null
      ? { latitude: user.latitude, longitude: user.longitude }
      : null;



  return (
    <div className="Post min-h-[calc(100vh-10rem)] w-[25rem] mx-auto pt-[4rem] px-[1.5rem]">
      <TitleHeader title={post.name} />
      <div className="PostContainer">
        <div className="ProfileAndPic">
          <div className="PostImage w-full h-[30rem] bg-backgroundsecondary rounded-2xl mt-2"></div>
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
              ✚ เพิ่มเข้าตู้เย็นเมื่อ {dateFormate(post.created_at)}
            </p>
            <p className="p3 text-textsecondary">
              ✏️ อัปเดตล่าสุดเมื่อ {dateFormate(post.updated_at)}
            </p>
            <p className="p3 text-textsecondary">🤢 จะบูดตอน {dateFormate(post.exp_date)}</p>
          </div>

          {/* Contact */}
          <div className="Contact flex flex-col gap-2 ">
            {userLocation && postLocation ? (
              <Distance userLocation={userLocation} ownerLocation={postLocation} />
            ) : (
              <div>ไม่พบข้อมูลตำแหน่ง</div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}