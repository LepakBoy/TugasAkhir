import TopBar from "../../src/components/TopBar";
import { topBarMainMenuList } from "../../src/constant/topBar-menu";
import styles from "../../styles/main-user.module.scss";
import { allMenu } from "../../src/constant/all-menu";
import ButtonPrimaryComponent from "../../src/components/global/ButtonPrimaryComponent";
import { useState } from "react";

export default function MainUser() {
  const [selectedItem, setSelectedItem] = useState("");

  const selectedImage = selectedItem ? "french-fries.jpg" : "no-image.jpg";

  return (
    <>
      <TopBar option head />
      <div className="row w-100 border-top">
        {/* <div className=""> */}
        <div
          className={`${styles["menu-detail_container"]} col-md-4 border-end`}
        >
          <div className={`${styles["menu-detail_wrapper"]}`}>
            <img
              className={`${styles["menu-detail_image"]} mx-auto mb-2`}
              src={`../../../images/${selectedImage}`}
              alt="detail-menu"
            />
            <span>{selectedItem || "No selected item"}</span>
            {selectedItem && (
              <>
                <p className={`${styles["menu-detail-parapgraph"]}`}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </p>
                <div
                  className={`${styles["menu-detail_qty"]} d-flex justify-content-center`}
                >
                  <button
                    className={`${styles["menu-detail_qty-btn"]}`}
                    style={{ width: "32px" }}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={"2"}
                    style={{
                      width: "32px",
                      textAlign: "center",
                      marginRight: "32px",
                      marginLeft: "32px",
                    }}
                  />
                  <button
                    className={`${styles["menu-detail_qty-btn"]}`}
                    style={{ width: "32px" }}
                  >
                    +
                  </button>
                </div>
                <div>
                  <ButtonPrimaryComponent
                    label="Add to cart"
                    type="button"
                    style={{
                      width: "168px",
                      marginTop: "16px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <ButtonPrimaryComponent
                    onClick={() => setSelectedItem("")}
                    label="Remove"
                    type="button"
                    backGroundColor="#cfcfcf"
                    textColor="#6e6464"
                    style={{
                      width: "168px",
                      marginTop: "10px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <div
            className={`${styles["menu-category_list"]} p-3 d-flex justify-content-between`}
          >
            {topBarMainMenuList.map((x, i: number) => (
              <div className="p-1" key={i}>
                <span className="cursor-pointer">{x.text}</span>
              </div>
            ))}
          </div>
          <div className={`${styles["menu-category_wrapper"]} row`}>
            {allMenu.map((x, i: number) => (
              <div className="col-md-3 mb-4 p-1" key={i}>
                <div className={`${styles["menu-category_item"]} text-center`}>
                  <img
                    className={`${styles["menu-category_image"]}`}
                    src="../../../images/burger.jpg"
                    alt="menu"
                  />
                  <div
                    className="d-flex flex-column justify-content-between align-items-center"
                    style={{ minHeight: "92px" }}
                  >
                    <span className="d-block mb-1">{x.name}</span>
                    <button
                      onClick={() => setSelectedItem(x.name)}
                      className={`${styles["menu-category_button-select"]}`}
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
