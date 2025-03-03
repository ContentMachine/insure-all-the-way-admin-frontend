"use client";

import React from "react";
import ArrowRight from "@/assets/svgIcons/ArrowRight";
import {
  CardDecoration1,
  CardDecoration2,
} from "@/assets/svgIcons/PoliciesSummaryCardDecoration";
import { formatCurrency } from "@/helpers/formatAmount";
import classes from "./PoliciesSummaryCard.module.css";

type AmountDetailsCardTypes = {
  title: string;
  amount: number | string;
  cta?: {
    text: string;
    action: () => void;
  };
  notAmount?: boolean;
};

const PoliciesSummaryCard = ({
  title,
  amount,
  cta,
  notAmount,
}: AmountDetailsCardTypes) => {
  return (
    <div className={classes.container}>
      <span className="text-base font-normal font-main">{title}</span>
      <h2> {notAmount ? amount : `₦${formatCurrency(amount)}`}</h2>
      {cta && (
        <div className="mt-5 flex gap-2 items-center justify-end">
          <span className="text-xs font-normal font-main">{cta.text}</span>
          <button
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
            onClick={cta.action}
          >
            <ArrowRight />
          </button>
        </div>
      )}
      <CardDecoration1 className={classes.decoration1} />
      <CardDecoration2 className={classes.decoration2} />
    </div>
  );
};

export default PoliciesSummaryCard;
