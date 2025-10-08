import React, { useState, useRef } from "react";
import EXIF from "exif-js";

const FileUploadPreview = () => {
  const [fileData, setFileData] = useState(null);
  const [preview, setPreview] = useState(null);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [dpi, setDpi] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.onload = function () {
        EXIF.getData(img, function () {
          const xDPI = EXIF.getTag(this, "XResolution");
          const yDPI = EXIF.getTag(this, "YResolution");
          const unit = EXIF.getTag(this, "ResolutionUnit");
          const unitLabel = unit === 3 ? "cm" : "inch";

          setFileData({
            name: file.name,
            size: (file.size / 1024).toFixed(1) + " KB",
            width: img.width,
            height: img.height,
            dpi: xDPI ? `${xDPI} × ${yDPI} per ${unitLabel}` : "DPI info not found (may not be embedded)",
          });
          setPreview(event.target.result);
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const calculateDPI = file => {
    const img = new Image();
    img.onload = () => {
      // Example: assume 4 inch width
      const dpiX = Math.round(img.width / 4);
      const dpiY = Math.round(img.height / 4);
      setDpi(`${dpiX} x ${dpiY} DPI`);
    };
    img.src = URL.createObjectURL(file);
  };
  const handleDrop = e => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      calculateDPI(droppedFile);
    }
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  return (
    <div className=" mt-10 bg-gray-100 shadow p-6 rounded-xl">
      <h2 className="text-xl text-black font-semibold mb-2">Upload Your Artwork</h2>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
        className="border-2 mt-10 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <p className="text-gray-600 mb-2">Drag & drop your image here</p>
        <p className="text-gray-400 text-sm">or click to browse files</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {preview && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Preview</h3>
          <img
            src={preview}
            alt="Preview"
            className="w-full max-h-80 object-contain rounded-md border-dashed"
          />

          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-medium">Name:</span> {fileData.name}
            </p>
            <p>
              <span className="font-medium">Size:</span> {fileData.size}
            </p>
            <p>
              <span className="font-medium">Dimensions:</span> {fileData.width} × {fileData.height}px
            </p>
            <p>
              <span className="font-medium">DPI:</span> {fileData.dpi}
            </p>
          </div>
        </div>
      )}

      {/* Accordion */}
      <div className=" pt-4">
        <button
          onClick={() => setAccordionOpen(!accordionOpen)}
          className="flex justify-between items-center w-full text-left text-base font-medium text-gray-800"
        >
          <span>How to upload a 300 DPI image for better DTF print</span>
          <span>{accordionOpen ? "−" : "+"}</span>
        </button>

        {accordionOpen && (
          <div className="mt-3 text-sm text-gray-700 space-y-2 bg-gray-50 p-3 rounded-md">
            <ul className="list-disc list-inside space-y-1">
              <li>Use a design or image file that is exactly 300 DPI.</li>
              <li>In Photoshop or similar tools, set resolution to 300 DPI before exporting.</li>
              <li>Save as JPEG or TIFF — these formats retain DPI metadata.</li>
              <li>Ensure the image size matches your print dimensions (e.g., 10"×10" → 3000×3000 px).</li>
              <li>Avoid screenshots or web images — they are usually 72 DPI.</li>
              <li>Keep colors in CMYK mode for accurate print output.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadPreview;
