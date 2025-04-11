"use client"

import { useState, useTransition } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"


function Document({ id }: { id: string }) {
    const [input, setInput] = useState("")
    const [isUpdating, startTransition] = useTransition()

    const updateTitle = (e: FormEvent) => {
        e.preventDefault()

        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input,
                })
            })
        }
    }



        return (
            <div>
                <div>
                    <form onSubmit={updateTitle}>
                        {/* update title */}
                        <Input value={input} onChange={(e) => setInput(e.target.value)} />

                        <Button disabled={isUpdating} type="submit">
                            {isUpdating ? "Updating..." : "Update"}
                        </Button>
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