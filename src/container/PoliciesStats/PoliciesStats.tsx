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
        backgroundColor="#717171"
      />

      <PoliciesSummaryCard
        title="Active Policies "
        amount={stats?.activePolicies}
        notAmount
        backgroundColor="rgb(46, 204, 113)"
      />

      <PoliciesSummaryCard
        title="Pending policies "
        amount={stats?.pendingPolicies}
        notAmount
        backgroundColor="rgb(255, 193, 7)"
      />

      <PoliciesSummaryCard
        title="Expired policies "
        amount={stats?.expiredPolicies}
        notAmount
        backgroundColor="rgb(212, 47, 47)"
      />
    </section>
  );
};

export default PoliciesStats;
