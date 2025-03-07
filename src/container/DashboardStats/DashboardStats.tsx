"use client";

import { usePoliciesAnalytics } from "@/hooks/usePolicies";
import classes from "./DashboardStats.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import { useMemo, useState } from "react";
import { structureWords } from "@/helpers/capitalize";
import Loader from "@/components/Loader/Loader";
import CustomTable from "@/components/CustomTable/CustomTable";
import { modalGenericType, requestType } from "@/utilities/types";
import { setAllModalsFalse, setModalTrue } from "@/helpers/modalHandlers";
import UserInfoModalBody from "../UserInfoModalBody/UserInfoModalBody";
import { requestHandler } from "@/helpers/requestHandler";
import { useToast } from "@/context/ToastContext";
import useError from "@/hooks/useError";
import { mutate } from "swr";
import Modal from "@/components/Modal/Modal";
import { routes } from "@/utilities/routes";
import ArrowDown from "@/assets/svgIcons/ArrowDown";

const DashboardStats = () => {
  // States
  const [modals, setModals] = useState<modalGenericType>({
    userDetails: false,
  });
  const [activeUserId, setActiveUserId] = useState<null | string>(null);
  const [requestState, setRequestState] = useState<requestType>({
    isLoading: false,
    data: null,
    error: null,
  });
  const [isVisible, setIsVisible] = useState(false);

  //   Hooks
  const { showToast } = useToast();
  const { errorFlowFunction } = useError();

  //   Requests
  const { isLoading, data: analyticsData } = usePoliciesAnalytics();

  //   Requests
  const userstatusToggleHandeler = () => {
    requestHandler({
      url: `/admin/users/${activeUserId}/toggle-status`,
      method: "PATCH",
      requestCleanup: true,
      state: requestState,
      setState: setRequestState,
      successFunction(res) {
        showToast(res?.data?.message, "success");
        mutate(`/admin/users/${activeUserId}`);
        mutate(`/admin/users`);
      },
      id: "toggle-user-status",
      errorFunction(err) {
        errorFlowFunction(err);
      },
    });
  };

  // Memos
  const lineChartData = useMemo(() => {
    return analyticsData?.data?.monthlyData;
  }, [analyticsData]);

  const pieChartData = useMemo(() => {
    if (analyticsData) {
      return Object.keys(analyticsData?.data?.insuranceTypes)?.map((data) => {
        return {
          name: structureWords(data),
          value: analyticsData?.data?.insuranceTypes[data],
        };
      });
    }
  }, [analyticsData]);

  const userClaimsData = useMemo(() => {
    if (analyticsData) {
      return analyticsData?.data?.topUsers?.map((data: any) => {
        return {
          claims: data?.totalClaims,
          firstName: data?.userDetails?.firstName,
          lastName: data?.userDetails?.lastName,
          email: data?.userDetails?.email,
          id: data?.userDetails?._id,
        };
      });
    }
  }, [analyticsData]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  console.log(analyticsData, "Data");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {modals.userDetails && (
        <Modal
          onClick={() => setAllModalsFalse(setModals)}
          body={
            <UserInfoModalBody
              onClose={() => setAllModalsFalse(setModals)}
              id={activeUserId as string}
              onToggleUserStatus={userstatusToggleHandeler}
              requestState={requestState}
            />
          }
        />
      )}
      <section className={classes.container}>
        <div
          onClick={() => setIsVisible((prevState) => !prevState)}
          className={classes.header}
        >
          <h4>Analytics</h4>
          <ArrowDown />
        </div>

        <div style={isVisible ? { maxHeight: "3000px" } : { maxHeight: "0px" }}>
          <div style={{ height: "500px" }}>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart
                data={lineChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" stroke="#717171" />
                <YAxis stroke="#717171" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="policies"
                  stroke="#a7c7e7"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="claims" stroke="#edd014" />
                <Line type="monotone" dataKey="users" stroke="#3561ff" />
              </LineChart>
            </ResponsiveContainer>

            <h4>Monthly Analysis of Policies, Claims and Users</h4>
          </div>
          <div style={{ height: "500px" }}>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  startAngle={360}
                  endAngle={0}
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={200}
                  innerRadius={150}
                  fill="#a7c7e7"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <h4>Distribution of Policies</h4>
          </div>
          <section>
            <CustomTable
              data={userClaimsData}
              header="Claims by User"
              fields={["firstName", "lastName", "email", "claims"]}
              headers={["First Name", "Last Name", "Email", "Claims"]}
              onRowClick={() => {
                setModalTrue(setModals, "userDetails");
              }}
              setState={setActiveUserId}
              loading={
                (requestState?.isLoading &&
                  requestState?.id === "toggle-user-status") ||
                isLoading
              }
              route={routes.USERS}
            />
          </section>
        </div>
      </section>
    </>
  );
};

export default DashboardStats;
