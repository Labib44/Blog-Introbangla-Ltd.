import dynamic from "next/dynamic";
const JoditEditor = dynamic(import("jodit-react"), { ssr: false });
import React, { useContext, useRef } from "react";
import CreateContext from "../Components/CreateContex";
const config = ["bold", "italic", "underline", "link", "unlink"];

const RichText = () => {
  const editor = useRef(null);
  const { setRichTextContent, richTextValue } = useContext(CreateContext);

  return (
    <JoditEditor
      ref={editor}
      tabIndex={8}
      value ={richTextValue}
      onBlur={(newContent) => setRichTextContent(newContent)} // preferred to use only this option to update the content for performance reasons
    />
  );
};

export default RichText;