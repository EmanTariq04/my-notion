"use client"

import { useOthers, useSelf } from "@liveblocks/react/suspense"


function Avatars() {
    const others = useOthers();
    const self = useSelf();

    const all = [self, ...others];
  return (
    <div className="flex items-center gap-2">
        <p className="font-light text-sm">Users currently editing this page</p>

        <div className="flex -space-x-5">
            {all.map((other, i) => (

            ))}
        </div>
        
    </div>
  )
}
export default Avatars