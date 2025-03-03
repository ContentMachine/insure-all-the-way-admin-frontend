import ArrowDown from "@/assets/svgIcons/ArrowDown";
import { capitalize, structureWords } from "@/helpers/capitalize";
import { TABLE_LENGTH } from "@/utilities/constants";
import { LinearProgress } from "@mui/material";
import Link from "next/link";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./CustomTable.module.css";

export type TableOption = {
  text: string;
  action: (rowData: Record<string, any>) => void;
};

type CustomTableProps = {
  header: string;
  headers: string[];
  fields: string[];
  data: Record<string, any>[];
  isOptions?: boolean;
  options?: TableOption[];
  onRowClick?: (rowData: Record<string, any>) => void;
  setState?: Dispatch<SetStateAction<string | null>>;
  loading?: boolean;
};

const CustomTable: React.FC<CustomTableProps> = ({
  header,
  headers,
  fields,
  data,
  isOptions = false,
  options = [],
  onRowClick,
  setState,
  loading,
}) => {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const toggleActiveRow = (index: number) => {
    setActiveRow(activeRow === index ? null : index);
  };

  //   refs
  const optionsRef = useRef<HTMLDivElement | null>(null);

  //   Effects
  useEffect(() => {
    if (typeof document !== "undefined") {
      const removeDropdownHandler = (e: any) => {
        if (optionsRef && !optionsRef?.current?.contains(e.target)) {
          setActiveRow(null);
        }
      };
      document.addEventListener("mousedown", removeDropdownHandler);

      return () => {
        document.removeEventListener("mousedown", removeDropdownHandler);
      };
    }
  });

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <span>{header}</span>
      </div>

      <div className={classes.tableHeaderContainer}>
        {headers.map((colHeader, index) => (
          <span key={index} className={classes.tableHeader}>
            {colHeader.toUpperCase()}
          </span>
        ))}
        {isOptions && <span className={classes.tableHeader}>OPTIONS</span>}
      </div>

      {loading && (
        <LinearProgress
          color="inherit"
          style={{ color: "#edd014", height: "2px" }}
        />
      )}

      {data && data.length > 0 ? (
        data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={classes.tableBodyContainer}
            onClick={() => {
              onRowClick && onRowClick(row);
              setState && setState(row?._id || row?.id);
              console.log(row, "ID");
            }}
          >
            {fields.map((field, colIndex) => {
              if (field?.includes("Date")) {
                return (
                  <span key={colIndex} className={classes.tableBody}>
                    {row[field] !== undefined && row[field] !== null
                      ? capitalize(String(row[field]))
                      : ""}
                  </span>
                );
              }
              return (
                <span key={colIndex} className={classes.tableBody}>
                  {row[field] !== undefined && row[field] !== null
                    ? structureWords(String(row[field]))
                    : ""}
                </span>
              );
            })}

            {isOptions && (
              <span className={classes.tableBody}>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleActiveRow(rowIndex);
                    setState && setState(row?._id || row?.id);
                  }}
                  className={classes.button}
                >
                  <span>Options</span>
                  <ArrowDown dimensions="16px" />

                  {activeRow === rowIndex && options.length > 0 && (
                    <div className={classes.options} ref={optionsRef}>
                      {options.map((option, optionIndex) => (
                        <span
                          key={optionIndex}
                          onClick={(e) => {
                            e.stopPropagation();
                            option.action(row);
                          }}
                        >
                          {option.text}
                        </span>
                      ))}
                    </div>
                  )}
                </span>
              </span>
            )}
          </div>
        ))
      ) : (
        <p className={classes.paragraph}>No data available</p>
      )}

      {data?.length === TABLE_LENGTH && (
        <Link href="/" className={classes.more}>
          View more
        </Link>
      )}
    </div>
  );
};

export default CustomTable;
