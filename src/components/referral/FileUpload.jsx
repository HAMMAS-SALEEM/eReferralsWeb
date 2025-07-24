import { useState, useRef, useEffect } from "react";
import { Box, Typography, Grid, IconButton, Paper } from "@mui/material";
import { CloudUpload as CloudUploadIcon, Cancel } from "@mui/icons-material";
import DescriptionIcon from "@mui/icons-material/Description";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { toast } from "react-toastify";

// Setting the worker path
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

const FileUpload = ({ onFileSelected, existingFile }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelection = (event) => {
    const file = event.target.files
      ? event.target.files[0]
      : event.dataTransfer.files[0];

    if (file) {
      const validFileTypes = ["application/pdf"];
      const maxSizeInMB = 100;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (!validFileTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload a PDF file.");
        return;
      }

      if (file.size > maxSizeInBytes) {
        toast.error(`File size exceeds the ${maxSizeInMB}MB limit.`);
        return;
      }

      setUploadedFile(file);
      setFileUrl(URL.createObjectURL(file));
      onFileSelected(file);
    }

    setIsDragging(false);
  };

  // Event handlers remain the same
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFileSelection(event);
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileUrl(null);
    onFileSelected(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast.info("File removed!");
  };

  return (
    <Box sx={{ borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
        Upload the Referral
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              border: "2px dashed transparent",
              boxShadow: "none",
              background:
                "linear-gradient(#E9E9E9,#E9E9E9) padding-box, linear-gradient(90deg, #3370fe, #00e599) border-box",
              padding: "16px",
              textAlign: "center",
              cursor: "pointer",
              boxSizing: "border-box",
              transition: "background-color 0.3s ease",
              height: "200px",
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            component="label"
            htmlFor="file-upload"
          >
            <input
              accept=".pdf"
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelection}
            />
            <CloudUploadIcon sx={{ fontSize: 50 }} />
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{ textDecoration: "underline", fontWeight: 600 }}
                variant="body1"
              >
                Click to upload
              </Typography>
              <Typography>&nbsp;or drag and drop here</Typography>
            </Box>
            <Typography variant="small" sx={{ mt: 1, color: "#333" }}>
              Maximum size 100MB
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              boxShadow: "none",
              background: "#FFF",
              position: "relative",
              textAlign: "center",
              boxSizing: "border-box",
              overflow: "hidden",
              height: "200px",
            }}
          >
            {uploadedFile ? (
              <>
                <IconButton
                  onClick={handleRemoveFile}
                  sx={{
                    color: "#000",
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <Cancel />
                </IconButton>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    overflowY: "auto",
                  }}
                >
                  <Document
                    file={fileUrl}
                    onLoadSuccess={() =>
                      toast.success("File loaded successfully!")
                    }
                    onLoadError={(error) =>
                      console.error("Error loading PDF: ", error)
                    }
                  >
                    <Page pageNumber={1} width={270} />
                  </Document>
                </Box>
              </>
            ) : (
              <>
                <DescriptionIcon sx={{ fontSize: 50, color: "#d3d3d3" }} />

                <Typography variant="subtitle1">
                  {existingFile?.id === "Ijdnm4WiGr7n"
                    ? "Upload your file"
                    : existingFile?.name || "Upload your file"}
                </Typography>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FileUpload;
