import React, { useContext, useEffect, useRef, useState } from "react";
import * as log from "loglevel";
import "./Uploader.css";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import UploadIcon from "@mui/icons-material/Upload";
const ll = log.getLogger("LibraryDownloader");
import process from "process";
import { Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";

const isLogsEnabled = true;
if (process.env.VITE_ENV === "development" && isLogsEnabled) {
  ll.setLevel(log.levels.DEBUG);
} else {
  ll.setLevel(log.levels.WARN);
}

function LoadFileButton(props) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target.result === "string") {
        props.onLoaded(JSON.parse(event.target.result));
      }
    };
    reader.readAsText(file);
  };
  return (
    <Button variant="contained" component="label" className={"custom-button"}>
      <input
        onChange={handleFileChange}
        type="file"
        id="xlsx-input"
        name="xlsx-input"
        hidden
      />
      Upload file
    </Button>
  );
}
function UploadDialog(props) {
  const { onClose, open } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >{`Load the Functions a file`}</DialogTitle>
      <Box style={{ margin: "15px" }}>
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoadFileButton
            onLoaded={(data) => {
              ll.debug("loaded file content", data);
            }}
          >
            Load from file
          </LoadFileButton>
        </div>
      </Box>
    </Dialog>
  );
}

export default function LibraryUploader(props) {
  return (
    <UploadDialog onClose={props.onClose} onLoad={props.onLoad} open={true} />
  );
}
