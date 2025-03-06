"use client";

import { useAllPolicies } from "@/hooks/usePolicies";
import classes from "./PoliciesFilter.module.css";
import { useEffect, useMemo, useState } from "react";
import { activeToggler } from "@/helpers/activeHandlers";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import Loader from "@/components/Loader/Loader";
import Car from "@/assets/svgIcons/Car";
import Health from "@/assets/svgIcons/Health";
import Property from "@/assets/svgIcons/Property";
import Umbrella from "@/assets/svgIcons/Umbrella";

const PoliciesFilter = () => {
  // Requests
  const { isLoading, data } = useAllPolicies();

  // Memo
  const [allPolicies, setAllPolicies] = useState<string[]>(["All"]);

  //   Hooks
  const { updateSearchParams } = useUpdateSearchParams();
  const policyParam = updateSearchParams("policy", undefined, "get");

  //   Utils
  const iconsHandler = (name: string) => {
    const lowerCaseName = name?.toLowerCase();
    if (lowerCaseName === "motor-insurance") {
      return <Car color="#717171" />;
    } else if (lowerCaseName === "health-insurance") {
      return <Health color="#d4a5e6" />;
    } else if (lowerCaseName === "property-insurance") {
      return <Property color="#edd014" />;
    } else {
      return <Umbrella size="24px" color="#a7c7e7" />;
    }
  };

  //   Effects
  useEffect(() => {
    if (data) {
      setAllPolicies((prevState) => {
        const combined = [...prevState, ...data?.data?.policies];
        const uniquePolicies = combined.filter(
          (policy, index, self) => index === self.findIndex((p) => p === policy)
        );
        return uniquePolicies;
      });
    }
  }, [data]);

  console.log(allPolicies, data?.data?.policies);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={classes.container}>
      <h4>Filters</h4>
      <div className={classes.filters}>
        {allPolicies?.map((policy, i) => {
          console.log(policy);
          return (
            <span
              key={policy}
              className={
                // policyParam &&
                // policyParam === policy?.replaceAll(" ", "-")?.toLowerCase()
                //   ? classes.active
                //   : classes.inActive

                !policyParam && policy === "All"
                  ? classes?.active
                  : policyParam === policy?.replaceAll(" ", "-")?.toLowerCase()
                  ? classes?.active
                  : classes?.inActive
              }
              onClick={() => {
                if (policy === "All") {
                  updateSearchParams("policy", undefined, "delete");
                } else {
                  updateSearchParams(
                    "policy",
                    policy?.replaceAll(" ", "-").toLowerCase(),
                    "set"
                  );
                }
              }}
            >
              <span>
                {iconsHandler(policy?.replaceAll(" ", "-").toLowerCase())}
              </span>
              <span>{policy}</span>
            </span>
          );
        })}
      </div>
    </section>
  );
};

export default PoliciesFilter;
