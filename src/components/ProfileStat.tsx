

interface ProfileStatProps {
    title: string;
    amount: number;
}

function ProfileStat({title, amount}: ProfileStatProps) {
    return (
        <div className="Info border border-textprimary rounded-2xl h-[3rem] px-4 w-full flex justify-between items-center ">
            <p className="text-textprimary " >{title} </p>
            <p className="text-textprimary " >{amount} ครั้ง</p>
        </div>
    )
}
export default ProfileStat