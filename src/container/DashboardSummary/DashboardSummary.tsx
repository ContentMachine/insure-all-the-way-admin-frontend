"use client";

import { useUserPoliciesStats } from "@/hooks/usePolicies";
import classes from "./DashboardSummary.module.css";
import PoliciesSummaryCard from "@/components/PoliciesSummaryCard/PoliciesSummaryCard";
import Loader from "@/components/Loader/Loader";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/utilities/routes";

const DashboardSummary = () => {
  // Requests
  const { isLoading, data } = useUserPoliciesStats();

  // Memos
  const stats = useMemo(() => data?.data?.data, [data]);

  // ROuter
  const router = useRouter();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.container}>
      <PoliciesSummaryCard
        title="Users"
        amount={stats?.users}
        notAmount
        cta={{
          text: "Go to Users",
          action() {
            router.push(routes.USERS);
          },
        }}
      />

      <PoliciesSummaryCard
        title="Policies "
        amount={stats?.policies}
        notAmount
        cta={{
          text: "Go to Policies",
          action() {
            router.push(routes.POLICIES);
          },
        }}
      />

      <PoliciesSummaryCard
        title="Claims "
        amount={stats?.claims}
        notAmount
        cta={{
          text: "Go to Claims",
          action() {
            router.push(routes.CLAIMS);
          },
        }}
      />
    </section>
  );
};

export default DashboardSummary;
