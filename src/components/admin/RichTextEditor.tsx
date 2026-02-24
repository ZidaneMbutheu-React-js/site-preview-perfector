import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, ImageIcon, LinkIcon, Undo, Redo,
} from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = 'Commencez à écrire...' }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-sm max-w-none min-h-[300px] p-4 focus:outline-none',
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  const addImage = () => {
    const url = prompt('URL de l\'image :');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = prompt('URL du lien :');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <div className="flex flex-wrap gap-1 p-2 border-b border-border bg-muted/30">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleBold().run()}
          data-active={editor.isActive('bold')}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <Heading3 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={addLink}>
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={addImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>
        <div className="flex-1" />
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
