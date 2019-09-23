import React from "react";
import Resume from "../../assets/miles_moran_resume.pdf";

function ResumeFile() {
  return (
    <embed
      src={Resume}
      width="500"
      height="700"
      type="application/pdf"
    />
  );
}

export default ResumeFile;
