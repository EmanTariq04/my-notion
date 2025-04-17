import { useUser } from "@clerk/nextjs"
import { useRoom } from "@liveblocks/react/suspense"
import { collectionGroup, where, query } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "@/firebase"

//making a custom hook to check if the user is owner of the room or not
function useOwner() {
    const { user } = useUser()
    const room = useRoom()
    const [isOwner, setIsOwner] = useState(false)
    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id)) //only if rooomId matches the one we are currently in
    );

    useEffect(() => {
        if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
            const owners = usersInRoom.docs.filter((doc) => doc.data().role === "owner")

            if (owners.some(
                (owner) => owner.data().userId === user?.emailAddresses[0].toString() //is users email one of owners email?
            )
            ) {
                setIsOwner(true)
            }
        }
    }, [usersInRoom, user]) //Run this checking code again if either the user changes or the list of users in the room changes.

    return isOwner;
}
export default useOwner