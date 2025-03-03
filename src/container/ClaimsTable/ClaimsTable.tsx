import CustomTable from "@/components/CustomTable/CustomTable";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import { useToast } from "@/context/ToastContext";
import { structureWords } from "@/helpers/capitalize";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { useClaims } from "@/hooks/usePolicies";
import { modalGenericType, requestType } from "@/utilities/types";
import { capitalize } from "@mui/material";
import React, { useMemo, useState } from "react";
import { mutate } from "swr";
import ClaimsInfoModalBody from "../ClaimsInfoModalBody/ClaimsInfoModalBody";

const claimsHeaders = ["Full Name", "Policy Type", "Status", "Location"];

const ClaimsTable = () => {
  const [modals, setModals] = useState<modalGenericType>({
    claimDetails: false,
  });
  const [activeUserId, setActiveUserId] = useState<null | string>(null);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });

  //   Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();

  //  Requests
  const { isLoading: claimsIsLoading, data: claimsData } = useClaims();

  // Memo
  const claims = useMemo(() => {
    return claimsData?.data?.claims?.map((data: any) => {
      return {
        fullName: `${data?.user?.lastName} ${data?.user?.firstName}`,
        insuranceType: structureWords(data?.insuranceId?.insuranceType),
        status: capitalize(data?.status),
        agent: data?.agent?.name,
        location: data?.location,
        _id: data?._id,
      };
    });
  }, [claimsData?.data]);

  const claimsStatusToggleHandeler = () => {
    requestHandler({
      url: `/admin/claims/${activeUserId}/toggle-status`,
      method: "PATCH",
      requestCleanup: true,
      state: requestState,
      id: "toggle-claim-status",
      setState: setRequestState,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate(`/admin/claims/${activeUserId}`);
        mutate(`/admin/claims`);
      },
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  const claimsOptions = [
    {
      text: "Toggle Claims Status",
      action: () => {
        claimsStatusToggleHandeler();
      },
    },
  ];

  if (claimsIsLoading) {
    return <Loader />;
  }

  return (
    <>
      {modals.claimDetails && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <ClaimsInfoModalBody
              onClose={() => setAllModalsFalse(setModals)}
              id={activeUserId as string}
            />
          }
        />
      )}

      <section>
        {claims?.length > 0 && (
          <CustomTable
            header="Policy Claims"
            data={claims}
            headers={claimsHeaders}
            options={claimsOptions}
            fields={["fullName", "insuranceType", "status", "location"]}
            isOptions
            setState={setActiveUserId}
            onRowClick={() => {
              setModalTrue(setModals, "claimDetails");
            }}
            loading={
              requestState?.id === "toggle-claim-status" &&
              requestState?.isLoading
            }
          />
        )}
      </section>
    </>
  );
};

export default ClaimsTable;
