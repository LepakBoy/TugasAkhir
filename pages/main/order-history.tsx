import { useEffect, useState } from "react";
import TopBar from "../../src/components/TopBar";
import stylesCart from "../../styles/cart.module.scss";
import styles from "../../styles/order-history.module.scss";
import moment from "moment";

export default function OrderHistory() {
  const userId =
    typeof window !== "undefined" && localStorage.getItem("userId");

  const [orderHistoryList, setOrdeHistoryList] = useState([]);
  console.log(orderHistoryList, "list");

  const [orderItem, setOrderItem] = useState([]);
  // console.log(orderItem, "order item");
  const [totalQtyItem, setTotalQtyItem] = useState(0);
  const [statusItem, setStatusItem] = useState("");

  const getUserOrderHistory = async () => {
    const req = await fetch(
      `http://localhost:8002/api/order/order-user/${userId}`,
      {
        method: "GET",
      }
    );

    await req.json().then((res) => {
      if (res.message === "success") {
        setOrdeHistoryList(res.data);
      }
    });
  };

  useEffect(() => {
    getUserOrderHistory();
  }, []);
  return (
    <>
      <TopBar option head role="USER" />
      <div className={`${styles["order-history_container"]}`}>
        <div className="row w-100 border-top">
          <div
            className="col-md-5 p-3 border-end justify-content-center align-items-center"
            style={{ height: "90vh", overflowY: "auto" }}
          >
            {orderItem[0] && (
              <div className={`${styles["invoice-area"]} mx-auto`}>
                <section className="text-center p-2 mb-3">
                  <span className={`${styles["invoice-title"]}`}>Invoice</span>
                </section>
                <section>
                  <div className="mb-5">
                    {orderItem.map((x, index) => (
                      <div
                        className="d-flex justify-content-between mb-2"
                        key={index}
                      >
                        <div>{`${x.name} X ${x.qty}`}</div>
                        <div>{`Rp. ${x.price}`}</div>
                      </div>
                    ))}
                  </div>
                  <div className={`${styles["invoice-total"]}`}>
                    {`Total : ${orderItem.reduce((a, b) => {
                      return a + b.price;
                    }, 0)}`}
                  </div>
                  {orderItem && (
                    <div className="text-end">{`Order date: ${moment(
                      orderItem[0].createdDate
                    ).format("DD MMM YYYY")} `}</div>
                  )}
                  <div className="text-end">{`Time order ${moment(
                    orderItem[0]?.createdDate
                  ).format("MM:HH")}`}</div>
                  <div className="text-end">
                    {`Status order : `}
                    <span style={{ fontWeight: 800 }}>
                      {statusItem.toUpperCase()}
                    </span>
                  </div>
                </section>
              </div>
            )}
          </div>
          <div
            className="col-md-7 px-5 text-center py-2"
            style={{ overflowY: "auto", height: "90vh" }}
          >
            <p className={`${stylesCart["order-summary_title"]} mb-3`}>
              Order history
            </p>
            {orderHistoryList.length > 0 ? (
              <>
                {orderHistoryList.map((x, index) => (
                  <div
                    className={`${styles["order-history-item"]} mx-auto mb-3`}
                    onClick={() => {
                      setOrderItem(x.orderDetails);
                      setTotalQtyItem(x.totalQty);
                      setStatusItem(x.status);
                    }}
                    key={index}
                  >
                    <span className="d-block">{`Date order : ${moment(
                      x.createdAt
                    ).format("DD MMM YYYY")}`}</span>
                    <span>{`total price : ${x.totalPrice}`}</span>
                  </div>
                ))}
              </>
            ) : (
              <>No order history</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
