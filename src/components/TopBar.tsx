import styles from "../../styles/top-bar.module.scss";

export default function TopBar() {
  return (
    <>
      <div className="p-1 d-flex justify-content-between bg-danger">
        <div className={`${styles["top-bar_icon"]}`}>logo</div>
        <div className={`${styles["top-bar_menu"]} bg-white`}>
          <span>menu 1</span>
          <span>menu 1</span>
          <span>menu 1</span>
          <span>menu 1</span>
          <span>menu 1</span>
        </div>
        <div className={`${styles["top-bar_options"]} bg-warning`}>
          <span>option 1</span>
          <span>option 1</span>
          <span>option 1</span>
        </div>
      </div>
    </>
  );
}
