import React, { useState } from "react";

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLInputElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };


  return (
    <>
      <div className="col-span-full">
        <label
          htmlFor="cover-photo"
          className="mb-5 mt-5 block text-xl font-medium leading-6 text-white"
        >
          Your current interior
        </label>
        <div className="border-white-900/25 mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 ">
          <div className="text-center">
            {/* <PhotoIcon className="mx-auto h-12 w-12 text-white" aria-hidden="true" /> */}
            <div className="mt-4 flex text-sm leading-6 text-white">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-slate-400 p-2 font-semibold text-white focus-within:outline-none focus-within:ring-2"
              >
                <span>Upload a file</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileInputChange}
                  onDrop={handleDrop}
                />
                {/* <input  onChange={handleFileInputChange}
                  onDrop={handleDrop} id="file-upload"  name="file-upload" type="file" multiple className="sr-only" /> */}
              </label>
            </div>
            <p className="mt-2 text-xs leading-5 text-white">
            or drag and drop PNG, JPG, GIF up to 10MB
            </p>
          </div>
        </div>
      </div>
      <ul>
        {files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>
    </>
  );
};

export default FileUpload;


