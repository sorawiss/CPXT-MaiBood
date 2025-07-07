'use client'
/* eslint-disable */
import React, { useState } from 'react'

import { Ellipsis } from 'lucide-react';

function Category() {
    const [selectedCategory, setSelectedCategory] = useState(1);
    const category = [
        {
            id: 1,
            name: 'เนื้อสัตว์',
            icon: <Ellipsis />
        },
        {
            id: 2,
            name: 'ผัก',
            icon: <Ellipsis />
        },
        {
            id: 3,
            name: 'ขนม',
            icon: <Ellipsis />
        },
        {
            id: 4,
            name: 'อื่น ๆ',
            icon: <Ellipsis />
        }
        

    ]


    return (
        <div className="category-button flex justify-between items-center w-full">

           {category.map((item) => (
            <button key={item.id} className="circle-button cursor-pointer ">
                {item.icon}
            </button>
           ))}

        </div>
    )
}

export default Category