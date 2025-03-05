import Close from "@/assets/svgIcons/Close";
import classes from "./CertificateUploadModalBody.module.css";
import FileUploadInput from "@/components/FileUploadInput/FileUploadInput";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "@/components/Button/Button";
import { requestHandler } from "@/helpers/requestHandler";
import { requestType } from "@/utilities/types";
import { mutate } from "swr";
import { setAllModalsFalse } from "@/helpers/modalHandlers";

type CertificateUploadModalBodyTypes = {
  onClose: () => void;
  certificate: File[] | null;
  setCertificate: Dispatch<SetStateAction<File[] | null>>;
  requestState: requestType;
  onSubmit: () => void;
};

const CertificateUploadModalBody = ({
  onClose,
  certificate,
  setCertificate,
  requestState,
  onSubmit,
}: CertificateUploadModalBodyTypes) => {
  return (
    <section className={classes.container}>
      <Close onClick={onClose} />
      <h2>Upload Certificate</h2>

      <FileUploadInput
        files={certificate as File[]}
        setFiles={setCertificate as Dispatch<SetStateAction<File[]>>}
        title="Please select a file to be uploaded"
        supportedFormats={["PDF", "DOCX"]}
        accept=".pdf, .docx"
      />

      <Button
        type="secondary"
        disabled={!certificate?.length}
        loading={requestState?.isLoading}
        onClick={onSubmit}
      >
        Upload
      </Button>
    </section>
  );
};

export default CertificateUploadModalBody;
