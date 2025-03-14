"use client";
import Loader from "@/components/Loader/Loader";
import PoliciesSummaryCard from "@/components/PoliciesSummaryCard/PoliciesSummaryCard";
import { useClaimsStats } from "@/hooks/usePolicies";
import { useMemo } from "react";
import classes from "../DashboardSummary/DashboardSummary.module.css";

const ClaimsStats = () => {
  // Request
  const { isLoading, data } = useClaimsStats();

  // Memo
  const stats = useMemo(() => data?.data, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.container}>
      <PoliciesSummaryCard
        title="Claims"
        amount={stats?.claimsLength}
        notAmount
        backgroundColor="#717171"
        noDecoration
      />

      <PoliciesSummaryCard
        title="Unresolved Claims "
        amount={stats?.pendingClaims}
        notAmount
        backgroundColor="rgb(212, 47, 47)"
        noDecoration
      />

      <PoliciesSummaryCard
        title="Resolved Claims "
        amount={stats?.activeClaims}
        notAmount
        backgroundColor="rgb(46, 204, 113)"
        noDecoration
      />
    </section>
  );
};

export default ClaimsStats;
