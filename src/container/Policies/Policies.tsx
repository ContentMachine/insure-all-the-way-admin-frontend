import SectionsHeader from "@/components/SectionsHeader/SectionsHeader";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import React from "react";
import PoliciesStats from "../PoliciesStats/PoliciesStats";
import PoliciesTable from "../PoliciesTable/PoliciesTable";
import classes from "./Policies.module.css";

const Policies = () => {
  return (
    <DashboardLayout className={classes.container}>
      <SectionsHeader header="Policies" />
      <PoliciesStats />
      <PoliciesTable />
    </DashboardLayout>
  );
};

export default Policies;
