'use client'
/* eslint-disable */
import React, { useState } from 'react'

import { Ellipsis, Croissant, LeafyGreen, Ham } from 'lucide-react';

function Category() {
    const [selectedCategory, setSelectedCategory] = useState(1);
    const category = [
        {
            id: 1,
            name: 'เนื้อสัตว์',
            icon: <Ham className='text-textprimary' />
        },
        {
            id: 2,
            name: 'ขนม',
            icon: <Croissant className='text-textprimary' />
        },
        {
            id: 3,
            name: 'ผัก/ผลไม้',
            icon: <LeafyGreen className='text-textprimary' />
        },
        {
            id: 4,
            name: 'อื่นๆ',
            icon: <Ellipsis className='text-textprimary' />
        }


    ]


    return (
        <div className="category-button flex justify-between items-center w-full">

            {category.map((item) => (
                <div className="CategoryButtonWrapper">
                    <button key={item.id} className="circle-button cursor-pointer ">
                        {item.icon}
                    </button>
                    <p className='p3 text-textsecondary text-center mt-1 '>{item.name}</p>
                </div>
            ))}

        </div>
    )
}

export default Category