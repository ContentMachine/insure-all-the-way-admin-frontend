import classes from "./SectionsHeader.module.css";

type SectionsHeaderTypes = {
  header: string;
  caption?: string;
  mini?: boolean;
};

const SectionsHeader = ({ header, caption, mini }: SectionsHeaderTypes) => {
  return (
    <section className={classes.container}>
      <h4>{header}</h4>
      {caption && <p>{caption}</p>}
    </section>
  );
};

export default SectionsHeader;
