import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { Button } from "react-daisyui";

const DropZone = ({ file, setFile, size }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop: ([file]) => {
      setFile(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    },
  });

  const thumbs = file && (
    <div key={file.name}>
      <div className="flex justify-center mt-5 ">
        <div className="w-44 relative">
          <img
            src={file.preview}
            alt=""
            className="w-full rounded "
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
          <Button
            size="sm"
            shape="circle"
            className="absolute -top-2 -right-2"
            onClick={() => setFile("")}
          >
            ✕
          </Button>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount

    return () => URL.revokeObjectURL(file?.preview);
  }, [file?.preview, file]);

  return (
    <section className={`container w-${size && size}`}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        {!file && (
          <div className="flex justify-center border border-dashed py-5">
            <MdAddPhotoAlternate size={45} color={"#0d47a1"} />
          </div>
        )}
      </div>
      {file && <aside>{thumbs}</aside>}
    </section>
  );
};

export default DropZone;
