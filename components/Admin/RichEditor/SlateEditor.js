import React, { useCallback, useMemo, useState } from "react";
// import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { createEditor, Element as SlateElement } from "slate";
import { withHistory } from "slate-history";
// import { toggleMark } from "./SlateUtilityFunctions";
import EditorToolbar from "./EditorToolbar";
import Link from "/next/link"

// const HOTKEYS = {
//   "mod+b": "bold",
//   "mod+i": "italic",
//   "mod+u": "underline",
//   "mod+`": "code",
// };

const SlateEditor = () => {
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <EditorToolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        // onKeyDown={(event) => {
        //   for (const hotkey in HOTKEYS) {
        //     if (isHotkey(hotkey, event)) {
        //       event.preventDefault();
        //       const mark = HOTKEYS[hotkey];
        //       toggleMark(editor, mark);
        //     }
        //   }
        // }}
      />
    </Slate>
  );
};

const Element = (props) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "headingOne":
      return <h1 {...attributes}>{children}</h1>;
    case "headingTwo":
      return <h2 {...attributes}>{children}</h2>;
    case "headingThree":
      return <h3 {...attributes}>{children}</h3>;
    case "blockquote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "alignLeft":
      return (
        <div
          style={{ textAlign: "left", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    case "alignCenter":
      return (
        <div
          style={{ textAlign: "center", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    case "alignRight":
      return (
        <div
          style={{ textAlign: "right", listStylePosition: "inside" }}
          {...attributes}
        >
          {children}
        </div>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "orderedList":
      return (
        <ol type="1" {...attributes}>
          {children}
        </ol>
      );
    case "unorderedList":
      return <ul {...attributes}>{children}</ul>;
    case "link":
      return <Link {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.color) {
    children = <span style={{ color: leaf.color }}>{children}</span>;
  }

  if (leaf.bgColor) {
    children = (
      <span style={{ backgroundColor: leaf.bgColor }}>{children}</span>
    );
  }

  return <span {...attributes}>{children}</span>;
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "blockquote",
    children: [{ text: "A wise quote." }],
  },
];

export default SlateEditor;
