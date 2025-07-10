import React from "react"

function layout( { children} : { children: React.ReactNode} ) {
  return (
    <div className="w-[25rem] mx-auto pt-[4rem] px-[1.5rem] " >
        {children}
    </div>
  )
}
export default layout