import Loader from "@/components/Loader/Loader";
import RequireAuth from "@/components/RequireAuth/RequireAuth";
import Policies from "@/container/Policies/Policies";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RequireAuth>
        <Policies />
      </RequireAuth>
    </Suspense>
  );
};

export default page;
