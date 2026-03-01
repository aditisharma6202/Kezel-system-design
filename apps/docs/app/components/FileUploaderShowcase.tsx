"use client";

import * as React from "react";
import {
  Typography,
  TypographyVariantEnum,
  FileUploader,
  TextInputVariant,
  TextInputSize,
  TextInputState,
} from "kz-design-system";

export default function FileUploaderShowcase() {
  const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);

  return (
    <section className="flex flex-col items-center gap-4 w-full max-w-lg">
      <Typography variant={TypographyVariantEnum.H2}>FileUploader</Typography>

      <div className="flex flex-col gap-6 w-full">
        <Typography variant={TypographyVariantEnum.H3}>Default</Typography>
        <FileUploader
          label="Attachments"
          value={uploadedFiles}
          onChange={setUploadedFiles}
          description="Upload documents, images, or other files"
        />

        <Typography variant={TypographyVariantEnum.H3}>Uncontrolled</Typography>
        <FileUploader
          label="Uncontrolled"
          helperText="No controlled value — internal state only"
        />

        <Typography variant={TypographyVariantEnum.H3}>Sizes</Typography>
        <FileUploader
          label="Small"
          value={uploadedFiles}
          onChange={setUploadedFiles}
          size={TextInputSize.Sm}
        />
        <FileUploader
          label="Medium"
          value={uploadedFiles}
          onChange={setUploadedFiles}
          size={TextInputSize.Md}
        />
        <FileUploader
          label="Large"
          value={uploadedFiles}
          onChange={setUploadedFiles}
          size={TextInputSize.Lg}
        />

        <Typography variant={TypographyVariantEnum.H3}>Variants</Typography>
        <FileUploader
          label="Default"
          value={uploadedFiles}
          onChange={setUploadedFiles}
          variant={TextInputVariant.Default}
        />
        <FileUploader
          label="Container"
          value={uploadedFiles}
          onChange={setUploadedFiles}
          variant={TextInputVariant.Container}
        />
        <FileUploader
          label="Ghost"
          value={uploadedFiles}
          onChange={setUploadedFiles}
          variant={TextInputVariant.Ghost}
        />

        <Typography variant={TypographyVariantEnum.H3}>Constrained</Typography>
        <FileUploader
          label="Images only (max 2MB)"
          value={uploadedFiles}
          onChange={setUploadedFiles}
          accept="image/*"
          maxSize={2097152}
          maxFiles={3}
          helperText="Up to 3 images, 2MB each"
        />

        <Typography variant={TypographyVariantEnum.H3}>States</Typography>
        <FileUploader
          label="Error"
          value={[]}
          onChange={() => {}}
          state={TextInputState.Error}
          errorText="Please upload at least one file."
        />
        <FileUploader
          label="Disabled"
          value={uploadedFiles}
          onChange={() => {}}
          disabled
        />
      </div>
    </section>
  );
}
