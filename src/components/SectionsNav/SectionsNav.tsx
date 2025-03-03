"use client";

import { activeToggler } from "@/helpers/activeHandlers";
import { Dispatch, SetStateAction, Suspense } from "react";
import classes from "./SectionsNav.module.css";
import { navItemTypes } from "@/utilities/types";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import Loader from "../Loader/Loader";
import { capitalizeEachWord } from "@/helpers/capitalize";

type SectionsNavTypes = {
  navItems: navItemTypes[];
  setNavItems: Dispatch<SetStateAction<navItemTypes[]>>;
  type?: "secondary" | "tertiary";
  isRoute?: boolean;
  id?: string;
};

const SectionsNav = ({
  navItems,
  setNavItems,
  type,
  isRoute,
  id,
}: SectionsNavTypes) => {
  // Hooks
  const { updateSearchParams } = useUpdateSearchParams();

  return (
    <Suspense fallback={<Loader />}>
      <section className={classes.container} id={id}>
        {navItems.map((navItem, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                if (isRoute) {
                  updateSearchParams("section", navItem?.id, "set");
                }
                activeToggler(index, navItems, setNavItems);
              }}
              className={`${
                navItem.isActive ? classes.active : classes.inActive
              } ${
                type === "secondary"
                  ? classes.button
                  : type === "tertiary"
                  ? classes.tertiary
                  : classes.noButton
              } ${navItem?.isBordered ? classes.bordered : undefined}`}
            >
              {capitalizeEachWord(navItem.title)}
            </div>
          );
        })}
      </section>
    </Suspense>
  );
};

export default SectionsNav;
