import SectionsHeader from "@/components/SectionsHeader/SectionsHeader";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import React from "react";
import UsersTable from "../UsersTable/UsersTable";
import UserStats from "../UserStats/UserStats";
import classes from "../Policies/Policies.module.css";

const Users = () => {
  return (
    <DashboardLayout className={classes.container}>
      <SectionsHeader header="Users" />
      <UserStats />
      <UsersTable />
    </DashboardLayout>
  );
};

export default Users;
