import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const Editor = () => {
    const ejInstance = useRef(null);

    useEffect(() => {
        if (!ejInstance.current) {
            ejInstance.current = new EditorJS({
                holder: "editorjs",
                tools: {
                    header: Header,
                    list: List,
                },
                placeholder: "Tulis sesuatu...",
                autofocus: true,
                onReady: () => {
                    console.log("Editor.js is ready to work!");
                },
                onChange: async () => {
                    const content = await ejInstance.current.save();
                    console.log("Content: ", content);
                },
            });
        }

        return () => {
            if (ejInstance.current && ejInstance.current.destroy) {
                ejInstance.current.destroy();
                ejInstance.current = null;
            }
        };
    }, []);

    return (
        <div className="prose max-w-none">
            <div id="editorjs" className="border border-gray-300 rounded p-4 bg-white"></div>
        </div>
    );
};

export default Editor;
