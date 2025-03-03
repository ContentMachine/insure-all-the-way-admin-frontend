"use client";

import { useUserPoliciesStats } from "@/hooks/usePolicies";
import classes from "./DashboardSummary.module.css";
import PoliciesSummaryCard from "@/components/PoliciesSummaryCard/PoliciesSummaryCard";
import Loader from "@/components/Loader/Loader";
import { useMemo } from "react";

const DashboardSummary = () => {
  // Requests
  const { isLoading, data } = useUserPoliciesStats();

  // Memos
  const stats = useMemo(() => data?.data?.data, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.container}>
      <PoliciesSummaryCard title="Users" amount={stats?.users} notAmount />

      <PoliciesSummaryCard
        title="Policies "
        amount={stats?.policies}
        notAmount
      />

      <PoliciesSummaryCard title="Claims " amount={stats?.claims} notAmount />
    </section>
  );
};

export default DashboardSummary;
