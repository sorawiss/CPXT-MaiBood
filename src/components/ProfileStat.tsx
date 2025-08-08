

interface ProfileStatProps {
    title: string;
    amount: number;
    isBold?: boolean;
}

function ProfileStat({ title, amount, isBold=false }: ProfileStatProps) {
    return (
        <div className={`Info border  rounded-2xl h-[3rem] px-4 w-full flex justify-between 
        items-center ${isBold ? "bg-textprimary text-background " : "border-textprimary border "}`}>
            <p>{title} </p>
            <p>{amount} ครั้ง</p>
        </div>
    )
}
export default ProfileStat