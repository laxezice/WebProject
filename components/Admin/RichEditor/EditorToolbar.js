import React from "react";
import { useSlate } from "slate-react";

import {
  BiBold,
  BiItalic,
  BiUnderline,
  BiCode,
  BiListOl,
  BiListUl,
} from "react-icons/bi";
import { BsTypeH1, BsTypeH2 } from "react-icons/bs";
import { FaQuoteRight } from "react-icons/fa";
import { RiAlignLeft, RiAlignCenter, RiAlignRight } from "react-icons/ri";
import {
  toggleBlock,
  toggleMark,
  isMarkActive,
  addMarkData,
  isBlockActive,
  activeMark,
} from "./SlateUtilityFunctions";
import { Button, Toolbar } from "./RichComponent";
import ColorPicker from "./Elements/Color Picker/ColorPicker";

const EditorToolbar = () => {
  const editor = useSlate();

  return (
    <Toolbar>
      <MarkButton format="bold" icon={<BiBold size={24} />} />
      <MarkButton format="italic" icon={<BiItalic size={24} />} />
      <MarkButton format="underline" icon={<BiUnderline size={24} />} />
      <MarkButton format="code" icon={<BiCode size={24} />} />
      <ColorPicker activeMark={activeMark} format="color" editor={editor} />
      <ColorPicker activeMark={activeMark} format="bgColor" editor={editor} />
      <BlockButton format="headingOne" icon={<BsTypeH1 size={24} />} />
      <BlockButton format="headingTwo" icon={<BsTypeH2 size={24} />} />
      <BlockButton format="blockquote" icon={<FaQuoteRight size={24} />} />
      <BlockButton format="orderedList" icon={<BiListOl size={24} />} />
      <BlockButton format="unorderedList" icon={<BiListUl size={24} />} />
      <BlockButton format="alignLeft" icon={<RiAlignLeft size={24} />} />
      <BlockButton format="alignCenter" icon={<RiAlignCenter size={24} />} />
      <BlockButton format="alignRight" icon={<RiAlignRight size={24} />} />
    </Toolbar>
  );
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon}
    </Button>
  );
};

export default EditorToolbar;
