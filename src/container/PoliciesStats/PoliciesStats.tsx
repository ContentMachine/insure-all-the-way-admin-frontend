"use client";

import Loader from "@/components/Loader/Loader";
import PoliciesSummaryCard from "@/components/PoliciesSummaryCard/PoliciesSummaryCard";
import { usePoliciesStats } from "@/hooks/usePolicies";
import React, { useMemo } from "react";
import classes from "../DashboardSummary/DashboardSummary.module.css";

const PoliciesStats = () => {
  // Request
  const { isLoading, data } = usePoliciesStats();

  // Memo
  const stats = useMemo(() => data?.data, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.container}>
      <PoliciesSummaryCard
        title="Policies"
        amount={stats?.policiesLength}
        notAmount
      />

      <PoliciesSummaryCard
        title="Active Policies "
        amount={stats?.activePolicies}
        notAmount
      />

      <PoliciesSummaryCard
        title="Pending policies "
        amount={stats?.pendingPolicies}
        notAmount
      />
    </section>
  );
};

export default PoliciesStats;
