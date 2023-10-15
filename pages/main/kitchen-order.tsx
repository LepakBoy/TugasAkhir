import { useState } from "react";
import TopBar from "../../src/components/TopBar";
import AccordionComponent from "../../src/components/global/AccordionComponent";
import ButtonPrimaryComponent from "../../src/components/global/ButtonPrimaryComponent";
import stylesCart from "../../styles/cart.module.scss";
import { dummyListOrder } from "../../src/constant/all-menu";

export default function MainKitchen() {
  const [listOrder, setListOrder] = useState(dummyListOrder);
  const handleInteractionOrder = (status: "ACCEPT" | "REJECT") => {
    return status;
  };

  const orderListChild = (
    <div className="d-flex justify-content-evenly align-items-center">
      <ButtonPrimaryComponent
        label="Reject"
        onClick={() => handleInteractionOrder("REJECT")}
        type="button"
        backGroundColor="#cfcfcf"
        textColor="#6e6464"
        style={{
          width: "168px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
      <ButtonPrimaryComponent
        label="Accept"
        onClick={() => handleInteractionOrder("ACCEPT")}
        type="button"
        style={{
          width: "168px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </div>
  );
  return (
    <>
      <TopBar option head />
      <div className="row w-100 border-top" style={{ height: "100%" }}>
        <div
          className={`${stylesCart["cart-list_container"]} col-md-6 mx-auto border-start border-end`}
        >
          <div>
            {listOrder.map((x, index: number) => (
              <div className="mb-3" key={index}>
                <AccordionComponent child={orderListChild} title={x.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
