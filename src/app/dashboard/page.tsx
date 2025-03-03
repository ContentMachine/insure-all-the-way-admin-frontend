import RequireAuth from "@/components/RequireAuth/RequireAuth";
import Dashboard from "@/container/Dashboard/Dashboard";
import React from "react";

const page = () => {
  return (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  );
};

export default page;
