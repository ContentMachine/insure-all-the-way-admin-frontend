import Loader from "@/components/Loader/Loader";
import SignIn from "@/container/SignIn/SignIn";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SignIn />{" "}
    </Suspense>
  );
};

export default page;
