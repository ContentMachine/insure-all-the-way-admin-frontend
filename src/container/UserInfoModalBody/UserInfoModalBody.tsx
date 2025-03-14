import Loader from "@/components/Loader/Loader";
import { formatObject } from "@/helpers/validateObjectValues";
import { useUserById } from "@/hooks/usePolicies";
import classes from "./UserInfoModalBody.module.css";
import React, { useMemo } from "react";
import Button from "@/components/Button/Button";
import { structureWords } from "@/helpers/capitalize";
import Close from "@/assets/svgIcons/Close";
import { requestType } from "@/utilities/types";
import moment from "moment";

type UserInfoModalBodyType = {
  onClose?: () => void;
  id: string;
  onToggleUserStatus: () => void;
  requestState: requestType;
};

const UserInfoModalBody = ({
  onClose,
  id,
  onToggleUserStatus,
  requestState,
}: UserInfoModalBodyType) => {
  // Requests
  const { isLoading, data } = useUserById(id);

  const policyInfo: { title: string; value: string }[] | undefined =
    useMemo(() => {
      if (data?.data) {
        return formatObject(data?.data?.user, [
          "_id",
          "__v",
          "createdAt",
          "firstLogin",
        ]);
      }
    }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>User Information</h2>

      <div className={classes.body}>
        {policyInfo?.map((data, i) => {
          if (data?.title === "Updated At") {
            return (
              <div key={i}>
                <h4>Last Update</h4>
                <p>{moment(data?.value).format("Do MMMM, YYYY. hh:mma")}</p>
              </div>
            );
          }

          return (
            <div key={i}>
              <h4>{data?.title}</h4>
              <p>{structureWords(data?.value)}</p>
            </div>
          );
        })}
      </div>

      <div className={classes.buttonContainer}>
        <Button type="bordered" onClick={onClose}>
          <span>Close</span>
        </Button>
        <Button onClick={onToggleUserStatus} loading={requestState?.isLoading}>
          <span>
            {data?.data?.user?.status === "active"
              ? "Deactivate User"
              : "Activate User"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default UserInfoModalBody;
