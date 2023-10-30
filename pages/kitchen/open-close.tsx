import TopBar from "../../src/components/TopBar";
import cartStyles from "../../styles/cart.module.scss";
import ButtonComponent from "../../src/components/global/ButtonPrimaryComponent";

export default function OpenClose() {
  const orderList = ["aa", "bb", "cc", "dd", "ee", "ff"];
  const cantenStatus = "OPEN";

  return (
    <>
      <TopBar option head role="KITCHEN" ordeListNumber={orderList.length} />

      <div className="row w-100 border-top" style={{ height: "100%" }}>
        <div
          className={`${cartStyles["cart-list_container"]} text-center col-md-6 mx-auto border-end border-start`}
        >
          <div className={`${cartStyles["cart-wrapper"]} py-3`}>
            <div className="mb-5">
              <span className={`${cartStyles["order-summary_title"]}`}>
                {`Your canteen is "${
                  cantenStatus === "OPEN" ? "Open" : "Close"
                }" now!`}
              </span>
              <ButtonComponent
                style={{
                  width: "162px",
                  height: "48px",
                  fontSize: "18px",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginTop: "22px",
                }}
                type="button"
                label={`${cantenStatus === "OPEN" ? "Open" : "Close"} it!`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
