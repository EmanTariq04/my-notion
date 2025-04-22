"use client";

import { useRoom } from "@liveblocks/react";
import { useSelf } from "@liveblocks/react/suspense";
import { useState, useEffect } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@Liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css"
// import "@blocknote/shadcn/styles.css"
import "@blocknote/core/style.css";
import stringToColor from "@/lib/stringToColor";
import TranslateDocument from "./TranslateDocument";

type EditorProps = {
    doc: Y.Doc;
    provider: any;
    darkMode: boolean;
}

function BlockNote({ doc, provider, darkMode }: EditorProps) {
    const userInfo = useSelf((me) => me.info);

    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment("document-store"), //everyone writes in the same document
            user: {
                name: userInfo?.name,
                color: stringToColor(userInfo?.email)
            },
        },
    });

    return (
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView
                className="min-h-screen"
                editor={editor}
                theme={
                    darkMode ? "dark" : "light"
                } />
        </div>
    )
}

function Editor() {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc>();
    const [provider, setProvider] = useState<LiveblocksYjsProvider>(); // connects the same room to different users so changes are shared 
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const yDoc = new Y.Doc(); //making new yjs document for a particular room
        const yProvider = new LiveblocksYjsProvider(room, yDoc)//providing the room id to the yjs document so that it can be shared with other users in the same room 
        setDoc(yDoc)
        setProvider(yProvider)

        return () => {
            yDoc?.destroy()
            yProvider?.destroy()
        }
    }, [room])

    if (!doc || !provider) {
        return null;
    }


    const style = `hover:text-white ${darkMode ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700" : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"}`

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 justify-end mb-10">
                <TranslateDocument doc={doc} />
                {/* chat to doc with ai  */}

                {/* dark mode  */}
                <Button className={style} onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <SunIcon /> : <MoonIcon />}
                </Button>
            </div>

            {/* blocknote  */}
            <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
        </div>
    );
}
export default Editor;
