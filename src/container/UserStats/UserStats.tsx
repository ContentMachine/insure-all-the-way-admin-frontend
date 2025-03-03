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
      <PoliciesSummaryCard title="Users" amount={stats?.allUsers} notAmount />

      <PoliciesSummaryCard
        title="Active Users "
        amount={stats?.activeUsers}
        notAmount
      />

      <PoliciesSummaryCard
        title=" Inactive users"
        amount={stats?.inActiveUsers}
        notAmount
      />
    </section>
  );
};

export default UserStats;
