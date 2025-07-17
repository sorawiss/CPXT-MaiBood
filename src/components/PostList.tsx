import Image from "next/image"
import Link from "next/link"
import { safeDate } from "@/utils/date-formate";


interface PostListProps {
    exp_date: string | Date
    price: number
    name: string
    id: string
    isMakro?: boolean
    image?: string
}


function PostList({ exp_date, price, name, id, isMakro = false, image = "" }: PostListProps) {
    const formattedDate = safeDate(exp_date).toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <Link href={`${isMakro ? "food/makro" : "/food"}/${id}?name=${name}`} >
            <div className="PostContainer w-[10.5rem]  bg-white flex flex-col gap-2 ">
                <div className="ImageWrapper relative ">
                    <div className="ImagePlaceHolder w-[10.5rem] h-[14rem] bg-backgroundsecondary rounded-2xl ">
                        <Image src={image} alt={name} width={378} height={504} className="object-cover 
                            rounded-2xl w-full h-full" />
                    </div>
                    <p className="ExpireDate p2 absolute w-fit h-5 rounded-2xl p-2 top-2 left-2
                                bg-background flex items-center justify-center" >exp: {formattedDate}
                    </p>
                    <p className="Price p2 absolute w-fit h-5 rounded-2xl p-2 bottom-2 right-2
                                bg-background flex items-center justify-center" >{price > 0 ? price + " บาท" : "ฟรี"}
                    </p>


                </div>
                <div className="food-description-wrapper">
                    <p className="food-name text-textprimary "> {name} </p>
                    <p className="p2 text-textsecondary food-seller"> ข้อมูลตรงนี้จะมาจากการเก็บข้อมูล user </p>
                </div>
            </div>
        </Link>

    )
}
export default PostList