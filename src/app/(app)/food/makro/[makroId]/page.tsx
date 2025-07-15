import Distance from "@/components/Distance";
import TitleHeader from "@/components/TitleHeader";
import { Ellipsis, Croissant, LeafyGreen, Ham } from "lucide-react";
import { makroData } from "../../../../../../public/makro-data";
import Image from "next/image";



export default async function Post({ params }: { params: Promise<{ makroId: string }> }) {
    const resolvedParams = await params;
    const makroId = resolvedParams.makroId;
    const categoryIcon = {
        "1": <Ham />,
        "2": <Croissant />,
        "3": <LeafyGreen />,
        "4": <Ellipsis />,
    };

    const post = makroData.find((post) => post.id === makroId);
    if (!post) {
        return <div>Post not found</div>;
    }

    const dateInfo = {
        created_at: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }),
        updated_at: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }),
        exp_date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 1).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
    }


    return (
        <div className="Post min-h-[calc(100vh-10rem)] w-[25rem] mx-auto pt-[4rem] px-[1.5rem]">
            <TitleHeader title={post.name} />
            <div className="PostContainer">
                <div className="ProfileAndPic">
                    <div className="PostImage w-full h-[30rem] bg-backgroundsecondary rounded-2xl mt-2">
                        <Image src={post.image} alt={post.name} width={1000} height={1000} className="object-cover 
                            rounded-2xl w-full h-full" />
                    </div>
                    <div className="ProfileWrapper flex items-center gap-2 mt-[1rem]">
                        <div className="ProfileImage w-10 h-10 bg-backgroundsecondary rounded-full"></div>
                        <h3 className="h3 text-textprimary">{post.user?.name}</h3>
                    </div>
                </div>

                <div className="PostInfo mt-[2rem] flex flex-col gap-[2rem] ">
                    {/* PostHeader */}
                    <div className="PostHeader ">
                        <div className="PostName flex items-center gap-1">
                            <h1>{post.name}</h1>
                            <h1>
                                {post.category && post.category !== 4
                                    ? categoryIcon[post.category as unknown as keyof typeof categoryIcon]
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
                    {/* <div className="Contact flex flex-col gap-2 ">
                        {userLocation && postLocation ? (
                            <Distance userLocation={userLocation} ownerLocation={postLocation} />
                        ) : (
                            <div>ไม่พบข้อมูลตำแหน่ง</div>
                        )}

                    </div> */}

                </div>

            </div>
        </div>
    );
}