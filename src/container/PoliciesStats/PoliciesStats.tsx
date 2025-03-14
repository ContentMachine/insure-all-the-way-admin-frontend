"use client";

import Loader from "@/components/Loader/Loader";
import PoliciesSummaryCard from "@/components/PoliciesSummaryCard/PoliciesSummaryCard";
import { usePoliciesStats } from "@/hooks/usePolicies";
import React, { useEffect, useMemo } from "react";
import classes from "../DashboardSummary/DashboardSummary.module.css";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { mutate } from "swr";

const PoliciesStats = () => {
  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();
  const activePolicy = updateSearchParams("policy", undefined, "get");

  // Request
  const { isLoading, data } = usePoliciesStats(activePolicy as string);

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
        noDecoration
      />

      <PoliciesSummaryCard
        title="Active Policies "
        amount={stats?.activePolicies}
        notAmount
        backgroundColor="rgb(46, 204, 113)"
        noDecoration
      />

      <PoliciesSummaryCard
        title="Pending policies "
        amount={stats?.pendingPolicies}
        notAmount
        backgroundColor="rgb(255, 193, 7)"
        noDecoration
      />

      <PoliciesSummaryCard
        title="Expired policies "
        amount={stats?.expiredPolicies}
        notAmount
        backgroundColor="rgb(212, 47, 47)"
        noDecoration
      />
    </section>
  );
};

export default PoliciesStats;
