import Loader from "@/components/Loader/Loader";
import Claims from "@/container/Claims/Claims";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Claims />
    </Suspense>
  );
};

export default page;
