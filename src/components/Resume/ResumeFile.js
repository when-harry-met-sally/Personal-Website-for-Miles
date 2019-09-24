import React from "react";
import Resume from "../../assets/miles_moran_resume.pdf";

function ResumeFile() {
  return (
    <embed
      src={Resume}
      width="750"
      height="1050"
      type="application/pdf"
    />
  );
}

export default ResumeFile;
