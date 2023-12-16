import { useEffect, useState } from "react";
import TopBar from "../../src/components/TopBar";
import AccordionComponent from "../../src/components/global/AccordionComponent";
import ButtonPrimaryComponent from "../../src/components/global/ButtonPrimaryComponent";
import stylesCart from "../../styles/cart.module.scss";
import { dummyListOrder } from "../../src/constant/all-menu";

export default function MainKitchen() {
  const [listOrder, setListOrder] = useState([]);
  const orderList = ["aa", "bb", "cc", "dd", "ee", "ff"];

  const getAllOrder = async () => {
    const req = await fetch("http://localhost:8002/api/order", {
      method: "GET",
    });
    await req.json().then((res) => {
      console.log(res, "res get order");
      setListOrder(res.data);
    });
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const handleInteractionOrder = (
    status: "ACCEPTED" | "FINISHED" | "IN PROGRESS",
    id: string
  ) => {
    if (status === "ACCEPTED") {
      const newListOrder = listOrder.map((x, index) => {
        if (x.id === id) {
          return { ...x, status: "IN PROGRESS" };
        } else {
          return x;
        }
      });
      setListOrder(newListOrder);
      // then
      // 1. fetch API PATCH order list
      // 2. trigger web socket to notify the user
    }

    if (status === "IN PROGRESS") {
      const newListOrder = listOrder.map((x, index) => {
        if (x.id === id) {
          return { ...x, status: "FINISHED" };
        } else {
          return x;
        }
      });
      setListOrder(newListOrder);
      // then
      // 1. fetch API PATCH order list
      // 2. trigger web socket to notify the user
    }

    if (status === "FINISHED") {
      setListOrder(listOrder.filter((x) => x.id !== id));
    }
  };
  const orderListChild = (status: string, id: string) => {
    return (
      <>
        <div className="d-flex justify-content-evenly align-items-center">
          <ButtonPrimaryComponent
            label={`${
              status === "IN PROGRESS"
                ? "FINISH ORDER"
                : status === "FINISHED"
                ? "DONE"
                : "ACCEPT"
            }`}
            onClick={() =>
              handleInteractionOrder(
                status === "PLACED"
                  ? "ACCEPTED"
                  : status === "IN PROGRESS"
                  ? "IN PROGRESS"
                  : "FINISHED",
                id
              )
            }
            type="button"
            style={{
              width: "168px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <TopBar option head role="KITCHEN" ordeListNumber={orderList.length} />
      <div className="row w-100 border-top" style={{ height: "100%" }}>
        <div
          className={`${stylesCart["cart-list_container"]} col-md-6 mx-auto border-start border-end`}
        >
          <div className={`${stylesCart["cart-wrapper"]}`}>
            <div className="mb-5">
              <span className={`${stylesCart["order-summary_title"]}`}>
                Order placed list
              </span>
            </div>
            {listOrder.length > 0 ? (
              <>
                {listOrder.map((x, index: number) => (
                  <div className="mb-3" key={index}>
                    <AccordionComponent
                      headerStyle={{
                        fontSize: "22px",
                        fontWeight: 700,
                        backgroundColor:
                          x.status === "PLACED" ? "#e1ff38" : "#fff",
                      }}
                      titleColor="#6a4029"
                      child={orderListChild(x.status, x.id)}
                      title={`${x.name} x ${x.qty} ${
                        x.status === "IN PROGRESS"
                          ? "(in progress)"
                          : x.status === "FINISHED"
                          ? "(finished)"
                          : ""
                      }`}
                      idParent={index.toString()}
                      dataTarget={`orderList-${index}`}
                    />
                  </div>
                ))}
              </>
            ) : (
              <p className="text-center">No order</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
