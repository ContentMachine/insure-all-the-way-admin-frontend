import Loader from "@/components/Loader/Loader";
import { routes } from "@/utilities/routes";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function Home() {
  <Suspense fallback={<Loader />}>{redirect(routes.DASHBOARD)}</Suspense>;

  return null;
}
