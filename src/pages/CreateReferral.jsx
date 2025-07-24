import React from "react";
import { useSelector } from "react-redux";
import FileReferral from "./referral/FileReferral";
import PathologyReferral from "./referral/PathologyReferral";
import { useLocation } from "react-router-dom";
import RadiologyReferral from "./referral/RadiologyReferral";

const CreateReferral = () => {
  const location = useLocation();
  const patient = useSelector((state) => state.patient);
  const practitionerProfile = useSelector((state) => state.profile.data);
  const practitionerLoading = useSelector((state) => state.profile.loading);
  const queryParams = new URLSearchParams(location.search);
  const method = queryParams.get("method");

  const referralType = useSelector((state) => state.referral.type);

  return (
    <div>
      {method === "file" ? (
        <FileReferral
          mode="create"
          method={method}
          referralType={referralType}
          patient={patient}
          practitionerProfile={practitionerProfile}
          practitionerLoading={practitionerLoading}
        />
      ) : method === "create" ? (
        referralType === "PATHOLOGY" ? (
          <PathologyReferral
            mode="create"
            method={method}
            referralType={referralType}
            patient={patient}
            practitionerProfile={practitionerProfile}
            practitionerLoading={practitionerLoading}
          />
        ) : referralType === "RADIOLOGY" ? (
          <RadiologyReferral
            mode="create"
            method={method}
            referralType={referralType}
            patient={patient}
            practitionerProfile={practitionerProfile}
            practitionerLoading={practitionerLoading}
          />
        ) : (
          <p>Please select a valid Request type.</p>
        )
      ) : (
        <p>Invalid method selected. Please try again.</p>
      )}
    </div>
  );
};

export default CreateReferral;
