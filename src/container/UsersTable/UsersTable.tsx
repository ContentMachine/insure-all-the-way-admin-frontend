"use client";

import CustomTable from "@/components/CustomTable/CustomTable";
import Loader from "@/components/Loader/Loader";
import Modal from "@/components/Modal/Modal";
import { useToast } from "@/context/ToastContext";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import { requestHandler } from "@/helpers/requestHandler";
import useError from "@/hooks/useError";
import { useUsers } from "@/hooks/usePolicies";
import { modalGenericType, requestType } from "@/utilities/types";
import React, { useMemo, useState } from "react";
import { mutate } from "swr";
import UserInfoModalBody from "../UserInfoModalBody/UserInfoModalBody";

export const headers = ["First Name", "Last Name", "Email", "Status"];

const UsersTable = () => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    userDetails: false,
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

  //   Memo
  const users = useMemo(() => {
    return data?.data?.users;
  }, [data?.data]);

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

  const options = [
    {
      text: "Toggle User Status",
      action: () => {
        userstatusToggleHandeler();
      },
    },
  ];

  if (isLoading) {
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
            requestState?.isLoading && requestState?.id === "toggle-user-status"
          }
        />
      )}
    </>
  );
};

export default UsersTable;
