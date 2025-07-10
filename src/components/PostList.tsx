import Link from "next/link"


function PostList() {
    return (
        <Link href={`/#`} >
            <div className="PostContainer w-[10.5rem]  bg-white flex flex-col gap-2 ">
                <div className="ImageWrapper relative ">
                    <div className="ImagePlaceHolder w-[10.5rem] h-[14rem] bg-backgroundsecondary rounded-2xl "></div>
                    <p className="ExpireDate absolute w-fit h-5 rounded-2xl p-2 top-2 left-2
                                bg-background flex items-center justify-center" >วันหมดอายุ
                    </p>
                    <p className="Price absolute w-fit h-5 rounded-2xl p-2 bottom-2 right-2
                                bg-background flex items-center justify-center" >ราคา
                    </p>


                </div>
                <div className="food-description-wrapper">
                    <p className="food-name text-textprimary "> ชื่ออาหาร </p>
                    <p className="p2 text-textsecondary food-seller"> ข้อมูลตรงนี้จะมาจากการเก็บข้อมูล user </p>
                </div>
            </div>
        </Link>

    )
}
export default PostList