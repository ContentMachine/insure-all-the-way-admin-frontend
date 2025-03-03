"use client";

import SectionsHeader from "@/components/SectionsHeader/SectionsHeader";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import ClaimsStats from "../ClaimsStats/ClaimsStats";
import ClaimsTable from "../ClaimsTable/ClaimsTable";
import classes from "../Policies/Policies.module.css";

const Claims = () => {
  return (
    <DashboardLayout className={classes.container}>
      <SectionsHeader header="Claims" />
      <ClaimsStats />
      <ClaimsTable />
    </DashboardLayout>
  );
};

export default Claims;
