import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import SlateEditor2 from "../../../components/Admin/RichEditor/SlateEditor2";
import AddSpeedDial from "../../../components/Admin/Course/AddSpeedDial";
import { BiX } from "react-icons/bi";
import EditableTable from "../../../components/Admin/Course/EditTable";
import ImageUploader from "../../../components/Admin/Course/ImageUploader";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const styles = {
  xBtn: {
    position: "absolute",
    right: 5,
    top: 5,
    background: "rgba(0,0,0,.8)",
    color: "#fff",
    border: 0,
    borderRadius: "50%",
    cursor: "pointer",
    width: 20,
    height: 20,
    padding: 0,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },
};

export default function ContentEditor(props) {
  const [preload, setPreload] = useState(true);
  const { contents, setContents } = props;

  useEffect(() => {
    let newContent = contents.map((c, index) => {
      return { ...c, id: (Date.now() + index).toString() };
    });
    setContents(newContent);
    console.log(contents);
    setPreload(false);
  }, []);

  const addContent = (type) => {
    let content;
    if (type === "paragraph") {
      content = {
        type: type,
        content: [
          {
            type: "paragraph",
            children: [{ text: "Write something here\n\n" }],
          },
        ],
      };
    } else if (type === "image") {
      content = {
        type: type,
        url: "",
        file: null,
      };
    } else if (type === "table") {
      content = {
        type: type,
        row: 2,
        column: 3,
        content: [],
      };
    }
    content.id = Date.now().toString();
    setContents([...contents, content]);
  };

  const updateContent = (index, value) => {
    contents[index].content = value;
    setContents([...contents]);
  };

  const removeContent = (index) => {
    contents.splice(index, 1);
    setContents([...contents]);
  };

  const renderContent = (content, index) => {
    if (content.type === "paragraph") {
      return (
        <SlateEditor2
          index={index}
          content={content.content}
          updateContent={updateContent}
        />
      );
    } else if (content.type === "image") {
      if (!content.file && !content.url) {
        return (
          <ImageUploader
            index={index}
            contents={contents}
            setContents={setContents}
          />
        );
      } else {
        // content.url = URL.createObjectURL(content.file);
        return (
          <img
            src={content.url}
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              margin: "2px 0px",
            }}
          />
        );
      }
    } else if (content.type === "table") {
      return (
        <EditableTable
          index={index}
          contents={contents}
          setContents={setContents}
        />
      );
    }
    return null;
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newItems = Array.from(contents);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setContents(newItems);
  };

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks
  //   contents.forEach((content) => {
  //     if (content.type === "image" && content.file) {
  //       URL.revokeObjectURL(content.url);
  //     }
  //   });
  // }, [contents]);

  return (
    <>
      {!preload && (
        <>
          {contents.map((content, index) => (
            <Box
              sx={{
                position: "relative",
                marginTop: 2,
                marginBottom: 2,
              }}
              key={content.id}
            >
              {renderContent(content, index)}
              <IconButton
                style={styles.xBtn}
                onClick={() => {
                  removeContent(index);
                }}
              >
                <BiX color="#FFFFFF" size={20} />
              </IconButton>
            </Box>
          ))}

          <AddSpeedDial addContent={addContent} />
        </>
      )}
    </>
  );
}
