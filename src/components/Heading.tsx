import styles from "./Heading.module.css";

interface HeadingProps {
  children: React.ReactNode;
  attr?: number;
}

export default function Heading({ children, attr }: HeadingProps) {

  return (
    <>
      <h1 className={styles.heading}> {children}</h1>
    </>
  )
}