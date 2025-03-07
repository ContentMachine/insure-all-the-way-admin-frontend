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
import PoliciesTable from "../PoliciesTable/PoliciesTable";
import UsersTable from "../UsersTable/UsersTable";
import ClaimsTable from "../ClaimsTable/ClaimsTable";

const DashboardTables = () => {
  return (
    <>
      <section>
        <UsersTable />
        <PoliciesTable />
        <ClaimsTable />
      </section>
    </>
  );
};

export default DashboardTables;
