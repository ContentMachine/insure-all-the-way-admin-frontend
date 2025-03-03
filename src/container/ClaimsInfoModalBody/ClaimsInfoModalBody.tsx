import Close from "@/assets/svgIcons/Close";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import { capitalize, structureWords } from "@/helpers/capitalize";
import { formatObject } from "@/helpers/validateObjectValues";
import { useClaimById } from "@/hooks/usePolicies";
import moment from "moment";
import { useMemo } from "react";
import classes from "../PolicyInformationModalBody/PolicyInformationModalBody.module.css";

type ClaimsInfoModalBodyTypes = {
  onClose?: () => void;
  id: string;
};

const ClaimsInfoModalBody = ({ onClose, id }: ClaimsInfoModalBodyTypes) => {
  // Requests
  const { isLoading, data } = useClaimById(id);

  console.log(id, "Claims");

  // MEmos
  const claimsInfo: { title: string; value: string }[] | undefined =
    useMemo(() => {
      if (data?.data) {
        const formattedData = {
          ...data?.data?.claim,
          agent: data?.data?.claim?.insuranceId?.agent?.name,
          user: `${data?.data?.claim?.user?.lastName} ${data?.data?.claim?.user?.firstName}`,
          email: data?.data?.claim?.user?.email,
          insurance: structureWords(
            data?.data?.claim?.insuranceId?.insuranceType
          ),
        };
        return formatObject(formattedData, [
          "_id",
          "__v",
          "createdAt",
          "insuranceId",
        ]);
      }
    }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Claim Information</h2>

      <div className={classes.body}>
        {claimsInfo?.map((data, i) => {
          if (data?.title.includes("Date")) {
            console.log(data, "Hmm");
            return (
              <div key={i}>
                <h4>{data?.title}</h4>
                <p>{moment(data?.value).format("Do MMMM, YYYY , hh:mm")}</p>
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
          Close
        </Button>

        <Button>
          <a href={`mailto:${data?.data?.claim?.user?.email}`}>
            Send Client a Mail
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ClaimsInfoModalBody;
