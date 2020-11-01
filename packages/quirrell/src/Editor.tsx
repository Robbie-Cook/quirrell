/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Quill from "quill";
// import "./quill.snow.css";
import * as _ from "lodash";
import React from "react";
import { Button } from "@robbie-cook/react-components";

function Editor(props: {
  text: string;
  onChange: (text: string) => Promise<void>;
}) {
  let quill: Quill | null = null;
  React.useEffect(() => {
    quill = new Quill("#editor", {
      modules: { toolbar: "#toolbar" },
      theme: "snow",
    });
  });

  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <div id="toolbar">
        <button className="ql-bold">Bold</button>
        <button className="ql-italic">Italic</button>
      </div>
      <div id="editor" dangerouslySetInnerHTML={{ __html: props.text }}></div>

      <Button
        css={css`
          margin-top: 40px;
        `}
        onClick={() => {
          const text = quill?.root.innerHTML;
          if (text) {
            props.onChange(text);
          }
        }}
      >
        Save
      </Button>
    </div>
  );
}

export default Editor;
