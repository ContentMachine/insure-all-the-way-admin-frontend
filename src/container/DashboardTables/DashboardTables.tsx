"use client";

import CustomTable from "@/components/CustomTable/CustomTable";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import { useToast } from "@/context/ToastContext";
import { capitalize, structureWords } from "@/helpers/capitalize";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { useClaims, usePolicies, useUsers } from "@/hooks/usePolicies";
import { modalGenericType, requestType } from "@/utilities/types";
import React, { useMemo, useState } from "react";
import { mutate } from "swr";
import ClaimsInfoModalBody from "../ClaimsInfoModalBody/ClaimsInfoModalBody";
import PolicyInformationModalBody from "../PolicyInformationModalBody/PolicyInformationModalBody";
import ReassignAnAgentModalBody from "../ReassignAnAgentModalBody/ReassignAnAgentModalBody";
import UserInfoModalBody from "../UserInfoModalBody/UserInfoModalBody";

export const headers = ["First Name", "Last Name", "Email", "Status"];
export const policyHeaders = [
  "Policy Held",
  "Expiration Date",
  "User",
  "Status",
];

export const claimsHeaders = ["Full Name", "Policy Type", "Status", "Location"];

const DashboardTables = () => {
  // States

  const [modals, setModals] = useState<modalGenericType>({
    userDetails: false,
    policyDetails: false,
    claimDetails: false,
    reassignAgent: false,
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

  // Requests
  const { isLoading, data } = useUsers();
  const { isLoading: policiesIsLoading, data: policiesData } = usePolicies();
  const { isLoading: claimsIsLoading, data: claimsData } = useClaims();

  //   Memo
  const users = useMemo(() => {
    return data?.data?.users?.slice(0, 5);
  }, [data?.data]);

  const policies = useMemo(() => {
    return policiesData?.data?.policies?.slice(0, 5)?.map((data: any) => {
      return {
        ...data,
        userDetails: `${data?.user?.lastName} ${data?.user?.firstName} `,
      };
    });
  }, [policiesData?.data]);
  const claims = useMemo(() => {
    return claimsData?.data?.claims?.slice(0, 5)?.map((data: any) => {
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

  //   Requests
  const userstatusToggleHandeler = () => {
    requestHandler({
      url: `/admin/users/${activeUserId}/toggle-status`,
      method: "PATCH",
      requestCleanup: true,
      state: requestState,
      setState: setRequestState,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate(`/admin/users/${activeUserId}`);
        mutate(`/admin/users`);
      },
      id: "toggle-user-status",
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

  const options = [
    {
      text: "Toggle User Status",
      action: () => {
        userstatusToggleHandeler();
      },
    },
  ];

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
  ];

  const claimsOptions = [
    {
      text: "Toggle Claims Status",
      action: () => {
        claimsStatusToggleHandeler();
      },
    },
  ];

  if (isLoading || policiesIsLoading || claimsIsLoading) {
    return <Loader />;
  }

  return (
    <>
      {modals.userDetails && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <UserInfoModalBody
              onClose={() => setAllModalsFalse(setModals)}
              id={activeUserId as string}
              onToggleUserStatus={userstatusToggleHandeler}
              requestState={requestState}
            />
          }
        />
      )}

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

      <section>
        {users?.length > 0 && (
          <CustomTable
            header="Users"
            data={users}
            headers={headers}
            options={options}
            fields={["firstName", "lastName", "email", "status"]}
            isOptions
            setState={setActiveUserId}
            onRowClick={() => {
              setModalTrue(setModals, "userDetails");
            }}
            loading={
              requestState?.isLoading &&
              requestState?.id === "toggle-user-status"
            }
          />
        )}

        {policies?.length > 0 && (
          <CustomTable
            header="Policies"
            data={policies}
            headers={policyHeaders}
            options={policiesOptions}
            fields={["insuranceType", "endDate", "userDetails", "status"]}
            isOptions
            setState={setActiveUserId}
            onRowClick={() => {
              setModalTrue(setModals, "policyDetails");
            }}
            loading={
              requestState?.id === "toggle-policy-status" &&
              requestState?.isLoading
            }
          />
        )}

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

export default DashboardTables;
