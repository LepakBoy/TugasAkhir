import TopBar from "../../src/components/TopBar";
import AccordionComponent from "../../src/components/global/AccordionComponent";
import stylesCart from "../../styles/cart.module.scss";

export default function MainKitchen() {
  return (
    <>
      <TopBar option head />
      <div className="row w-100 border-top" style={{ height: "100%" }}>
        <div
          className={`${stylesCart["cart-list_container"]} col-md-6 mx-auto border-start border-end`}
        >
          <AccordionComponent />
        </div>
      </div>
    </>
  );
}
