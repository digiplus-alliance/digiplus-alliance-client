import React, { useCallback } from "react";
import { RiCodeSSlashFill } from "react-icons/ri";
import { BsQuote } from "react-icons/bs";
import { LuHighlighter } from "react-icons/lu";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from "lucide-react";
import { Editor } from "@tiptap/react";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import { HeadingButton } from "@/components/tiptap-ui/heading-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }
  return (
    <div className="control-group">
      <div className="space-x-2 items-center grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-18 gap-2">
        <UndoRedoButton
          editor={editor}
          action="undo"
          //   text="Undo"
          hideWhenUnavailable={false}
          showShortcut={false}
          onExecuted={() => console.log("Action executed!")}
          className="disabled:opacity-40 disabled:cursor-not-allowed"
        />
        <UndoRedoButton
          editor={editor}
          action="redo"
          // text="Redo"
          hideWhenUnavailable={false}
          showShortcut={false}
          onExecuted={() => console.log("Action executed!")}
          className="disabled:opacity-40 disabled:cursor-not-allowed"
        />

        <HeadingButton
          editor={editor}
          level={1}
          //   text="H1"
          hideWhenUnavailable={false}
          showShortcut={false}
          className="data-[active-state=on]:!bg-gray-200"
        />
        <HeadingButton
          editor={editor}
          level={2}
          //   text="H2"
          hideWhenUnavailable={false}
          showShortcut={false}
          className="data-[active-state=on]:!bg-gray-200"
        />
        <HeadingButton
          editor={editor}
          level={3}
          //   text="H3"
          hideWhenUnavailable={false}
          showShortcut={false}
          className="data-[active-state=on]:!bg-gray-200"
        />

        <TextAlignButton
          editor={editor}
          align="left"
          hideWhenUnavailable={false}
          showShortcut={false}
          onAligned={() => console.log("Text aligned left!")}
          className="data-[active-state=on]:!bg-gray-200"
        />
        <TextAlignButton
          editor={editor}
          align="center"
          hideWhenUnavailable={false}
          showShortcut={false}
          onAligned={() => console.log("Text aligned center!")}
          className="data-[active-state=on]:!bg-gray-200"
        />
        <TextAlignButton
          editor={editor}
          align="right"
          hideWhenUnavailable={false}
          showShortcut={false}
          onAligned={() => console.log("Text aligned right!")}
          className="data-[active-state=on]:!bg-gray-200"
        />
        <TextAlignButton
          editor={editor}
          align="justify"
          hideWhenUnavailable={false}
          showShortcut={false}
          onAligned={() => console.log("Text aligned justify!")}
          className="data-[active-state=on]:!bg-gray-200"
        />
        <Toggle
          value="bold"
          aria-label="Toggle bold"
          pressed={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant="outline"
          className="data-[active-state=on]:!bg-gray-200 border-none shadow-none"
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="lg"
          aria-label="Toggle italic"
          pressed={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="data-[state=on]:!bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <Italic />
        </Toggle>

        <Toggle
          aria-label="Toggle underline"
          size="lg"
          pressed={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="data-[state=on]:!bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <Underline className="h-4 w-4" />
        </Toggle>

        <Toggle
          aria-label="Toggle strikethrough"
          size="lg"
          pressed={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="data-[state=on]:!bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <Strikethrough />
        </Toggle>

        <Toggle
          aria-label="Toggle bullet list"
          size="lg"
          pressed={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="data-[state=on]:!bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <List />
        </Toggle>

        <Toggle
          aria-label="Toggle ordered list"
          size="lg"
          pressed={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="data-[state=on]:!bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <ListOrdered />
        </Toggle>

        <Toggle
          aria-label="Toggle code"
          size="lg"
          pressed={editor.isActive("code")}
          onClick={() => editor.chain().focus().toggleCode().run()}
          className="data-[state=on]:!bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <RiCodeSSlashFill />
        </Toggle>

        <Toggle
          aria-label="Toggle blockquote"
          size="lg"
          pressed={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="data-[state=on]:!bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <BsQuote />
        </Toggle>

        {/* <ImageUploadButton
          editor={editor}
          // text="Add Image"
          hideWhenUnavailable={true}
          showShortcut={false}
          onInserted={() => {}}
        /> */}

        <Toggle
          aria-label="Toggle highlight"
          size="lg"
          pressed={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className="data-[state=on]:!bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <LuHighlighter />
        </Toggle>
      </div>
    </div>
  );
}
