import { Ellipsis, Croissant, LeafyGreen, Ham } from 'lucide-react';

interface FridgeInfoProps {
    meat: number | null;
    cake: number | null;
    fruit: number | null;
    other: number | null;
}


export const category = [
    {
        id: 1,
        name: 'เนื้อสัตว์',
        icon: <Ham className='text-textsecondary' strokeWidth={1.5} />
    },
    {
        id: 2,
        name: 'ขนม',
        icon: <Croissant className='text-textsecondary' strokeWidth={1.5} />
    },
    {
        id: 3,
        name: 'ผัก/ผลไม้',
        icon: <LeafyGreen className='text-textsecondary' strokeWidth={1.5} />
    },
    {
        id: 4,
        name: 'อื่นๆ',
        icon: <Ellipsis className='text-textsecondary' strokeWidth={1.5} />
    }
]



function FridgeInfo({ meat, cake, fruit, other }: FridgeInfoProps) {
    return (
        <div className="flex w-full justify-between ">
            {category.map((item) => (
                <div key={item.id} className="flex flex-col justify-center items-center gap-2 ">
                    {item.icon}
                    <p className='p3 text-textsecondary' >
                        {item.name} {item.id === 1 ? meat ? meat : 0 : item.id === 2 ? cake ? cake : 0 : item.id === 3 ? fruit ? fruit : 0 : other ? other : 0} ชิ้น
                    </p>
                </div>
            ))}
        </div>
    )
}
export default FridgeInfo