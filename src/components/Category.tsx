'use client'
/* eslint-disable */
import React from 'react'

import { Ellipsis, Croissant, LeafyGreen, Ham } from 'lucide-react';

interface CategoryProps {
    value: number | null;
    onChange: (categoryId: number | null) => void;
}


function Category({ value, onChange }: CategoryProps) {
    const category = [
        {
            id: 1,
            name: 'เนื้อสัตว์',
            icon: <Ham />
        },
        {
            id: 2,
            name: 'ขนม',
            icon: <Croissant />
        },
        {
            id: 3,
            name: 'ผัก/ผลไม้',
            icon: <LeafyGreen />
        },
        {
            id: 4,
            name: 'อื่นๆ',
            icon: <Ellipsis />
        }
    ]

    return (
        <div className="category-button flex justify-between items-center w-full">

            {category.map((item) => (
                <div className="CategoryButtonWrapper" key={item.id}>
                    <button
                        type="button"
                        className={`circle-button cursor-pointer ${value === item.id ?
                            'text-background bg-textprimary ' : 'text-textprimary'}`}
                        onClick={() => onChange(value === item.id ? null : item.id)}
                        aria-pressed={value === item.id}
                    >
                        {item.icon}
                    </button>
                    <p className='p3 text-textsecondary text-center mt-1 '>{item.name}</p>
                </div>
            ))}
        </div>
    )
}

export default Category