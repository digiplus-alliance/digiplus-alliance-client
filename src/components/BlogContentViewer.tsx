import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Image as TiptapImage } from "@tiptap/extension-image";

export default function BlogContentViewer({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: content || "<p class='text-gray-500'>No content yet...</p>",
    editable: false, // Read-only mode
    immediatelyRender: false, // Fix SSR hydration mismatch
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none p-6 " +
          "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-4 [&_h1]:text-gray-900 " +
          "[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-3 [&_h2]:text-gray-900 " +
          "[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-gray-900 " +
          "[&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-2 [&_h4]:text-gray-800 " +
          "[&_h5]:text-lg [&_h5]:font-semibold [&_h5]:mt-2 [&_h5]:mb-1 [&_h5]:text-gray-800 " +
          "[&_h6]:text-base [&_h6]:font-semibold [&_h6]:mt-2 [&_h6]:mb-1 [&_h6]:text-gray-800 " +
          "[&_p]:text-base [&_p]:my-3 [&_p]:leading-relaxed [&_p]:text-gray-700 " +
          "[&_*[style*='text-align:_left']]:text-left " +
          "[&_*[style*='text-align:_center']]:text-center " +
          "[&_*[style*='text-align:_right']]:text-right " +
          "[&_*[style*='text-align:_justify']]:text-justify " +
          "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-3 " +
          "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-3 " +
          "[&_li]:my-1 [&_li]:text-base [&_li]:text-gray-700 " +
          "[&_blockquote]:border-l-4 [&_blockquote]:border-gray-400 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-gray-600 " +
          "[&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono " +
          "[&_mark]:bg-yellow-200 [&_mark]:px-1 [&_mark]:rounded " +
          "[&_strong]:font-bold [&_strong]:text-gray-900 " +
          "[&_em]:italic " +
          "[&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800 " +
          "[&_img]:rounded-lg [&_img]:my-4",
      },
    },
  });

  return <EditorContent editor={editor} />;
}
