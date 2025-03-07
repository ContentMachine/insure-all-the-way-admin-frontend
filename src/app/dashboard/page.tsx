import RequireAuth from "@/components/RequireAuth/RequireAuth";
import Dashboard from "@/container/Dashboard/Dashboard";

const page = () => {
  return (
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  );
};

export default page;
