"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import MenuBar from "./menu-bar";
import { Image } from "@tiptap/extension-image";
import { Dropcursor } from "@tiptap/extensions";
import "@/components/tiptap-node/image-node/image-node.scss";
import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node'
import { handleImageUpload, MAX_FILE_SIZE } from '@/lib/tiptap-utils'


interface TextEditorProps {
  content?: string;
  onChangeContent?: (content: string) => void;
}

const TextEditor = ({ content, onChangeContent }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Dropcursor,
      Image,
      Image.configure({
        resize: {
          enabled: true,
          alwaysPreserveAspectRatio: true,
        },
      }),
      ImageUploadNode.configure({
        accept: 'image/*',
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error('Upload failed:', error),
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: content || "",

    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-4 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-3 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-2 [&_h5]:text-lg [&_h5]:font-semibold [&_h5]:mt-2 [&_h5]:mb-1 [&_h6]:text-base [&_h6]:font-semibold [&_h6]:mt-2 [&_h6]:mb-1 [&_p]:text-base [&_p]:my-2 [&_*[style*='text-align:_left']]:text-left [&_*[style*='text-align:_center']]:text-center [&_*[style*='text-align:_right']]:text-right [&_*[style*='text-align:_justify']]:text-justify [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 [&_li]:my-1 [&_li]:text-base [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_mark]:bg-yellow-200 [&_mark]:px-1 [&_mark]:rounded",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChangeContent) {
        onChangeContent(html);
      }
    },
  });

  // Update editor content when the content prop changes
  useEffect(() => {
    if (editor && content !== undefined && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div className="border rounded-lg bg-white p-4 min-h-[300px] md:min-h-[530px] w-full">
      <div className=" border-b pb-2">
        <MenuBar editor={editor} />
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
