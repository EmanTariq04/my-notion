"use client"

import { useState } from "react"
import { Input } from "./ui/input"


function Document({ id }: { id: string }) {
    const [input, setInput] = useState("")


    return (
        <div>
            <div>
                <form>
                    update title
                    <Input value={input} onChange={(e) => setInput(e.target.value)} />
                    {/* if */}
                    {/* isOwner + invite + deleteDocument */}
                </form>
            </div>

            <div>
                {/* ManageUser  */}
                {/* Avatars  */}
            </div>

            {/* Collaberative editor  */}
        </div>
    )
}
export default Document