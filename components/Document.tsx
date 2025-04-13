"use client"

import { useState, useTransition, useEffect, FormEvent } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useDocumentData } from "react-firebase-hooks/firestore"


function Document({ id }: { id: string }) {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const [input, setInput] = useState("")
    const [isUpdating, startTransition] = useTransition()

    useEffect(() => {
        if (data) {
            setInput(data.title)
        }
    }, [data])


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