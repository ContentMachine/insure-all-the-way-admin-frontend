import SignIn from "@/container/SignIn/SignIn";
import { routes } from "@/utilities/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(routes.DASHBOARD);

  return null;
}
