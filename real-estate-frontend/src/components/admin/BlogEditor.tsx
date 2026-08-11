"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Bold, Italic, List, Heading2, Heading3, Link as LinkIcon, Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function BlogEditor({ content, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline underline-offset-4",
        },
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      transformPastedHTML(html) {
        return html
          .replace(/ style="[^"]*"/gi, "")
          .replace(/ style='[^']*'/gi, "")
          .replace(/ class="[^"]*(?:mso|Mso)[^"]*"/gi, "")
          .replace(/ class='[^']*(?:mso|Mso)[^']*'/gi, "");
      },
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[250px] p-4",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) {
      return;
    }
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-[#172033]/20 rounded-md overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="bg-[#F4F6F9] border-b border-[#172033]/10 p-2 flex flex-wrap gap-1 items-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("heading", { level: 2 }) ? "bg-[#172033]/10" : ""
          }`}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`h-8 w-8 p-0 ${
            editor.isActive("heading", { level: 3 }) ? "bg-[#172033]/10" : ""
          }`}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-[#172033]/10 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`h-8 w-8 p-0 ${editor.isActive("bold") ? "bg-[#172033]/10" : ""}`}
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`h-8 w-8 p-0 ${editor.isActive("italic") ? "bg-[#172033]/10" : ""}`}
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-[#172033]/10 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`h-8 w-8 p-0 ${editor.isActive("bulletList") ? "bg-[#172033]/10" : ""}`}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-[#172033]/10 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={setLink}
          className={`h-8 w-8 p-0 ${editor.isActive("link") ? "bg-[#172033]/10" : ""}`}
          title="Link"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>

        <div className="w-px h-6 bg-[#172033]/10 mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          title="Clear Formatting"
        >
          <Eraser className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
