import Close from "@/assets/svgIcons/Close";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import { structureWords } from "@/helpers/capitalize";
import { useAgents, usePolicyById } from "@/hooks/usePolicies";
import { useEffect, useMemo, useState } from "react";
import classes from "./ReassignAnAgentModalBody.module.css";

type ReassignAnAgentModalBodyTypes = {
  onClose?: () => void;
  id: string;
  onAssign: (policyId: string, agentId: string) => void;
  loading: boolean;
};

const ReassignAnAgentModalBody = ({
  onClose,
  id,
  onAssign,
  loading,
}: ReassignAnAgentModalBodyTypes) => {
  // Requests
  const { isLoading, data } = usePolicyById(id);
  const { isLoading: agentIsLoading, data: agentData } = useAgents();

  //   States
  const [selectedId, setSelectedId] = useState(null);

  //   Memos
  const policyId = useMemo(() => data?.data?.policy, [data?.data]);
  const agents = useMemo(() => agentData?.data?.agents, [agentData?.data]);

  //   Effects
  useEffect(() => {
    if (data?.data) setSelectedId(data?.data?.policy?.agent?.id);
  }, [data]);

  console.log(selectedId, 1000, agents);

  if (agentIsLoading || isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.container}>
      <Close onClick={onClose} />
      <h2>Re-assign an Agent</h2>

      <div className={classes.body}>
        {agents?.map((data: any, i: number) => {
          console.log(selectedId === data?._id, policyId, selectedId);

          return (
            <div
              key={i}
              className={
                data?._id === selectedId ? classes.active : classes?.inActive
              }
              onClick={() => setSelectedId(data?._id)}
            >
              <h4>{data?.name}</h4>
              <p>{data?.email}</p>
            </div>
          );
        })}
      </div>

      <div className={classes.buttonContainer}>
        <Button type="bordered" onClick={onClose}>
          Close
        </Button>
        <Button
          disabled={selectedId === data?.data?.policy?.agent?.id}
          onClick={() => {
            if (selectedId) onAssign(id, selectedId as string);
          }}
          loading={loading}
        >
          Re-assign Agent
        </Button>
      </div>
    </div>
  );
};

export default ReassignAnAgentModalBody;
