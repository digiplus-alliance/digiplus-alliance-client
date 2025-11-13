import React from "react";
import {
  RiArrowGoBackFill,
  RiArrowGoForwardFill,
  RiCodeSSlashFill,
} from "react-icons/ri";
import { BsQuote } from "react-icons/bs";
import { Toggle } from "@/components/ui/toggle";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TbAlignCenter,
  TbAlignJustified,
  TbAlignLeft2,
  TbAlignRight,
} from "react-icons/tb";
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from "lucide-react";
import { LuHighlighter } from "react-icons/lu";
import { Editor } from "@tiptap/react";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }
  return (
    <div className="control-group">
      <div className="space-x-1 flex flex-row">
        <UndoRedoButton
          editor={editor}
          action="undo"
          //   text="Undo"
          hideWhenUnavailable={false}
          showShortcut={true}
          onExecuted={() => console.log("Action executed!")}
        />
        <UndoRedoButton
          editor={editor}
          action="redo"
          // text="Redo"
          hideWhenUnavailable={false}
          showShortcut={true}
          onExecuted={() => console.log("Action executed!")}
        />

        <HeadingDropdownMenu
          editor={editor}
          levels={[1, 2, 3, 4, 5, 6]}
          hideWhenUnavailable={false}
          portal={false}
          onOpenChange={(isOpen) =>
            console.log("Dropdown", isOpen ? "opened" : "closed")
          }
        />

        <TextAlignButton
          editor={editor}
          align="left"
          text="Left"
          hideWhenUnavailable={false}
          showShortcut={true}
          onAligned={() => console.log("Text aligned!")}
        />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </div>
      <div className="button-group space-x-1">
        <button>
          <Select>
            <SelectTrigger className="w-[70px] border-none shadow-none px-2 bg-transparent">
              <SelectValue
                placeholder={<TbAlignLeft2 className="text-black" />}
                className="placeholder:text-black"
              />
            </SelectTrigger>
            <SelectContent className="w-[10px]">
              <SelectGroup>
                <SelectItem value="align-left">
                  <button
                    onClick={() =>
                      editor.chain().focus().setTextAlign("left").run()
                    }
                    className={
                      editor.isActive({ textAlign: "left" }) ? "is-active" : ""
                    }
                  >
                    <TbAlignLeft2 className="text-black" />
                  </button>
                </SelectItem>
                <SelectItem value="align-center">
                  <button
                    onClick={() =>
                      editor.chain().focus().setTextAlign("center").run()
                    }
                    className={
                      editor.isActive({ textAlign: "center" })
                        ? "is-active"
                        : ""
                    }
                  >
                    <TbAlignCenter className="text-black" />
                  </button>
                </SelectItem>
                <SelectItem value="align-right">
                  <button
                    onClick={() =>
                      editor.chain().focus().setTextAlign("right").run()
                    }
                    className={
                      editor.isActive({ textAlign: "right" }) ? "is-active" : ""
                    }
                  >
                    <TbAlignRight className="text-black" />
                  </button>
                </SelectItem>
                <SelectItem value="align-justify">
                  <button
                    onClick={() =>
                      editor.chain().focus().setTextAlign("justify").run()
                    }
                    className={
                      editor.isActive({ textAlign: "justify" })
                        ? "is-active"
                        : ""
                    }
                  >
                    <TbAlignJustified className="text-black" />
                  </button>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </button>

        <Toggle
          value="bold"
          aria-label="Toggle bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant="outline"
          className="data-[state=on]:bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="lg"
          aria-label="Toggle italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="data-[state=on]:bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <Italic />
        </Toggle>

        <Toggle
          aria-label="Toggle italic"
          size="lg"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="data-[state=on]:bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <Underline className="h-4 w-4" />
        </Toggle>

        <Toggle
          aria-label="Toggle strikethrough"
          size="lg"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="data-[state=on]:bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <Strikethrough />
        </Toggle>

        <Toggle
          aria-label="Toggle bullet list"
          size="lg"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="data-[state=on]:bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <List />
        </Toggle>

        <Toggle
          aria-label="Toggle ordered list"
          size="lg"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="data-[state=on]:bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <ListOrdered />
        </Toggle>

        <Toggle
          aria-label="Link"
          size="lg"
          onClick={() => editor.chain().focus().createLink().run()}
          className="data-[state=on]:bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <Link />
        </Toggle>

        <Toggle
          aria-label="code"
          size="lg"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className="data-[state=on]:bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <RiCodeSSlashFill />
        </Toggle>

        <Toggle
          aria-label="quote"
          size="lg"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="data-[state=on]:bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <BsQuote />
        </Toggle>

        <Toggle
          aria-label="highlight"
          size="lg"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className="data-[state=on]:bg-gray-200 data-[state=on]:*:[svg]:stroke-[#3D3A3A] border-none shadow-none"
        >
          <LuHighlighter />
        </Toggle>
      </div>
    </div>
  );
}
