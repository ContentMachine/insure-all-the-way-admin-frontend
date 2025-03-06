"use client";

import CustomTable from "@/components/CustomTable/CustomTable";
import Modal from "@/components/Modal/Modal";
import { useToast } from "@/context/ToastContext";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { usePolicies } from "@/hooks/usePolicies";
import { modalGenericType, requestType } from "@/utilities/types";
import React, { useEffect, useMemo, useState } from "react";
import { mutate } from "swr";
import PolicyInformationModalBody from "../PolicyInformationModalBody/PolicyInformationModalBody";
import ReassignAnAgentModalBody from "../ReassignAnAgentModalBody/ReassignAnAgentModalBody";
import CertificateUploadModalBody from "../CertificateUploadModalBody/CertificateUploadModalBody";
import Loader from "@/components/Loader/Loader";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";

export const policyHeaders = [
  "Policy Held",
  "Expiration Date",
  "User",
  "Status",
];

const policyHeaderOptions: { [key: string]: string[] } = {
  "motor-insurance": [
    "Policy Held",
    "Expiration Date",
    "Documentation",
    "Status",
  ],
  "health-insurance": [
    "Policy Held",
    "Expiration Date",
    "Name of Organization",
    "Status",
  ],
  "property-insurance": [
    "Policy Held",
    "Expiration Date",
    "Location Of Property",
    "Status",
  ],
};

const PoliciesTable = () => {
  // States
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [activeUserId, setActiveUserId] = useState<null | string>(null);
  const [modals, setModals] = useState<modalGenericType>({
    policyDetails: false,
    reassignAgent: false,
    uploadCertificate: false,
  });
  const [certificate, setCertificate] = useState<File[] | null>([]);
  const [certificateFormData, setCertificateFormData] = useState(
    new FormData()
  );

  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();
  const policy = updateSearchParams("policy", undefined, "get");

  //   Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();
  const { isLoading: policiesIsLoading, data: policiesData } = usePolicies(
    policy as string
  );

  //   Memo
  const policies = useMemo(() => {
    return policiesData?.data?.policies?.map((data: any) => {
      return {
        ...data,
        userDetails: `${data?.user?.lastName} ${data?.user?.firstName} `,
      };
    });
  }, [policiesData?.data]);

  // Requests
  const policyStatusToggleHandeler = () => {
    requestHandler({
      url: `/admin/policies/${activeUserId}/toggle-status`,
      method: "PATCH",
      requestCleanup: true,
      state: requestState,
      id: "toggle-policy-status",
      setState: setRequestState,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate(`/admin/policies/${activeUserId}`);
        mutate(`/admin/policies`);
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const reassignAgentleHandler = (policyId: string, agentId: string) => {
    requestHandler({
      url: `/admin/policies/${policyId}/reassign-agent`,
      data: { agentId },
      method: "PATCH",
      requestCleanup: true,
      state: requestState,
      setState: setRequestState,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate(`/admin/policies/${activeUserId}`);
        mutate(`/admin/policies`);
        setAllModalsFalse(setModals);
      },
      id: "reassign-agent",
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const handleCertificateUpload = () => {
    requestHandler({
      url: `/admin/policies/${activeUserId}`,
      data: certificateFormData,
      method: "PATCH",
      isMultipart: true,
      requestCleanup: true,
      state: requestState,
      setState: setRequestState,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate(`/admin/policies`);
        setAllModalsFalse(setModals);
        setCertificate(null);
      },
      id: "upload-certificate",
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const policiesOptions = [
    {
      text: "Re-assign An Agent",
      action: () => {
        setModalTrue(setModals, "reassignAgent");
      },
    },

    {
      text: "Toggle Policy Status",
      action: () => {
        policyStatusToggleHandeler();
      },
    },

    {
      text: "Upload Certificate",
      action: () => {
        setModalTrue(setModals, "uploadCertificate");
      },
    },
  ];

  // Effects
  useEffect(() => {
    if (certificate?.length) {
      const subCertificateFormData = new FormData();

      subCertificateFormData.append("certificate", certificate[0] as File);

      setCertificateFormData(subCertificateFormData);
    }
  }, [certificate]);

  if (policiesIsLoading) {
    return <Loader />;
  }

  return (
    <>
      {modals.policyDetails && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <PolicyInformationModalBody
              onClose={() => setAllModalsFalse(setModals)}
              id={activeUserId as string}
            />
          }
        />
      )}

      {modals.reassignAgent && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <ReassignAnAgentModalBody
              onClose={() => setAllModalsFalse(setModals)}
              id={activeUserId as string}
              onAssign={(policyId, agentId) => {
                reassignAgentleHandler(policyId, agentId);
              }}
              loading={
                requestState?.id === "reassign-agent" && requestState?.isLoading
              }
            />
          }
        />
      )}

      {modals.uploadCertificate && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <CertificateUploadModalBody
              onClose={() => setAllModalsFalse(setModals)}
              certificate={certificate}
              setCertificate={setCertificate}
              requestState={requestState}
              onSubmit={handleCertificateUpload}
            />
          }
        />
      )}

      <section>
        <CustomTable
          header="Policies"
          data={policies}
          headers={policyHeaderOptions[policy as string] || policyHeaders}
          options={policiesOptions}
          fields={["insuranceType", "endDate", "userDetails", "status"]}
          isOptions
          setState={setActiveUserId}
          onRowClick={() => {
            setModalTrue(setModals, "policyDetails");
          }}
          loading={
            (requestState?.id === "toggle-policy-status" &&
              requestState?.isLoading) ||
            policiesIsLoading
          }
        />
      </section>
    </>
  );
};

export default PoliciesTable;
