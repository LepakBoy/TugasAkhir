import TopBar from "../../src/components/TopBar";
import cartStyles from "../../styles/cart.module.scss";

export default function Kitchen() {
  // order list that has "NEW" | "PLACED" status => filtered array
  return (
    <>
      <TopBar option head role="KITCHEN" />
      <div className="row w-100 border-top" style={{ height: "100%" }}>
        <div
          className={`${cartStyles["cart-list_container"]} text-center align-items-center d-flex col-md-6 mx-auto border-end border-start`}
        >
          <div className={`${cartStyles["cart-wrapper"]}`}>
            <div className="mb-5">
              <span className={`${cartStyles["order-summary_title"]}`}>
                Welcome on board, Chef!
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
