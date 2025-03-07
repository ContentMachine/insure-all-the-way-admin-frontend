"use client";

import Loader from "@/components/Loader/Loader";
import PoliciesSummaryCard from "@/components/PoliciesSummaryCard/PoliciesSummaryCard";

import { useUserStats } from "@/hooks/usePolicies";
import { useMemo } from "react";
import classes from "../DashboardSummary/DashboardSummary.module.css";

const UserStats = () => {
  // Request
  const { isLoading, data } = useUserStats();

  // Memo
  const stats = useMemo(() => data?.data, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.container}>
      <PoliciesSummaryCard
        title="Users"
        amount={stats?.allUsers}
        notAmount
        backgroundColor="#717171"
        noDecoration
      />

      <PoliciesSummaryCard
        title="Active Users "
        amount={stats?.activeUsers}
        notAmount
        backgroundColor="rgb(46, 204, 113)"
        noDecoration
      />

      <PoliciesSummaryCard
        title=" Inactive users"
        amount={stats?.inActiveUsers}
        notAmount
        backgroundColor="rgb(212, 47, 47)"
        noDecoration
      />
    </section>
  );
};

export default UserStats;
