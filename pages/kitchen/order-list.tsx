import { useEffect, useState } from "react";
import TopBar from "../../src/components/TopBar";
import AccordionComponent from "../../src/components/global/AccordionComponent";
import ButtonPrimaryComponent from "../../src/components/global/ButtonPrimaryComponent";
import stylesCart from "../../styles/cart.module.scss";
import { dummyListOrder } from "../../src/constant/all-menu";

export default function MainKitchen() {
  const [listOrder, setListOrder] = useState([]);

  const getAllOrder = async () => {
    const req = await fetch("http://localhost:8002/api/order", {
      method: "GET",
    });
    await req.json().then((res) => {
      console.log(res, "res get order");
      setListOrder(
        res.data.filter((x) => {
          return x.status !== "FINISHED";
        })
      );
    });
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const handleUpdateStatusOrder = async (id: string, status: string) => {
    const req = await fetch("http://localhost:8002/api/order/update-status", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, status: status }),
    });

    await req.json().then((res) => {
      if (res.message === "success") {
      }
    });
    getAllOrder();
  };

  const handleInteractionOrder = (
    status: "ACCEPTED" | "FINISHED" | "IN_PROGRESS",
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
      handleUpdateStatusOrder(id, "IN_PROGRESS");

      // 2. trigger web socket to notify the user
    }

    if (status === "IN_PROGRESS") {
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
      handleUpdateStatusOrder(id, "FINISHED");
    }

    if (status === "FINISHED") {
      handleUpdateStatusOrder(id, status);

      setListOrder(listOrder.filter((x) => x.id !== id));
    }
  };
  const orderListChild = (status: string, id: string, orderDetails: any) => {
    return (
      <>
        <div className="">
          {orderDetails.map((x) => (
            <div className="d-flex justify-content-evenly w-100 mx-auto px-4 mb-2 row">
              <div className="col-md-9">{x.name}</div>
              <div className="col-md-3">{`x ${x.qty}`}</div>
            </div>
          ))}

          <ButtonPrimaryComponent
            label={`${
              status === "IN_PROGRESS"
                ? "FINISH ORDER"
                : status === "FINISHED"
                ? "DONE"
                : "ACCEPT"
            }`}
            onClick={() =>
              handleInteractionOrder(
                status === "PLACED"
                  ? "ACCEPTED"
                  : status === "IN_PROGRESS"
                  ? "IN_PROGRESS"
                  : "FINISHED",
                id
              )
            }
            type="button"
            style={{
              fontSize: "14px",
              width: "168px",
              height: "32px",
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
      <TopBar option head role="KITCHEN" ordeListNumber={listOrder.length} />
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
                    <div
                      className="mx-auto p-2"
                      style={{
                        maxWidth: "420px",
                        borderRadius: "4px",
                        backgroundColor: "#e2e2e2",
                      }}
                    >
                      <div className="mb-2">
                        {`Status order : `}
                        <span style={{ fontWeight: 700, fontSize: "17px" }}>
                          {x.status}
                        </span>
                      </div>
                      {orderListChild(x.status, x.id, x.orderDetails)}
                    </div>
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
