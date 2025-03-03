"use client";

import { Suspense } from "react";
import classes from "./StepLayout.module.css";
import useUpdateSearchPRams from "@/hooks/useUpdateSearchParams";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";

type UserOnboardingLayoutProps = {
  children: React.ReactNode;
  notShowHeader?: boolean;
  steps: number[];
  title?: string;
  caption?: string;
  notShowButton?: boolean;
  disabled?: boolean;
};

const StepLayout = ({
  children,
  steps,
  title,
  caption,
  notShowButton,
  disabled,
}: UserOnboardingLayoutProps) => {
  // Hooks
  const { updateSearchParams } = useUpdateSearchPRams();

  // Steps
  const userStep = updateSearchParams("step", undefined, "get");

  return (
    <Suspense fallback={<Loader />}>
      <section className={classes.container}>
        <div className={classes.stepIndicator}>
          {steps.map((data) => {
            return (
              <div
                className={`${classes.step} ${
                  userStep && userStep >= data.toString()
                    ? classes.active
                    : classes.inActive
                }`}
                key={data}
              >
                <hr />
                <span>{data}</span>
              </div>
            );
          })}
        </div>
        <div className={classes.children}>
          <div className={classes.header}>
            <h4>{title}</h4>
            <p>{caption}</p>
          </div>
          {children}

          {!notShowButton && (
            <div className={classes.buttonContainer}>
              {Number(userStep) > 1 && (
                <Button
                  type="bordered"
                  onClick={() => {
                    if (Number(userStep) > 1) {
                      updateSearchParams(
                        "step",
                        String(Number(userStep) - 1),
                        "set"
                      );
                    }
                  }}
                >
                  Previous
                </Button>
              )}
              <Button
                className={classes.nextButton}
                onClick={() => {
                  if (Number(userStep) < steps.length) {
                    updateSearchParams(
                      "step",
                      String(Number(userStep) + 1),
                      "set"
                    );
                  }
                }}
                disabled={disabled}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </Suspense>
  );
};

export default StepLayout;
