"use client"

import { usePathname } from "next/navigation"

function BreadCrumbs() {
    const path = usePathname();

    const segments = path.split("/");

    console.log(segments)
    
  return (
    <div>BreadCrumbs</div>
  )
}
export default BreadCrumbs