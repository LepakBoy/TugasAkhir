import TopBar from "../../src/components/TopBar";
import stylesCart from "../../styles/cart.module.scss";
import styles from "../../styles/order-history.module.scss";

export default function OrderHistory() {
  const orderHistory = [
    {
      name: "Gado-gado",
      qty: "1",
      totalPrice: "18000",
    },
    {
      name: "Kerupuk",
      qty: "2",
      totalPrice: "8000",
    },
    {
      name: "Nasi putih",
      qty: "1",
      totalPrice: "6000",
    },
    {
      name: "Jus alpukat",
      qty: "1",
      totalPrice: "15000",
    },
  ];

  const orderHistoryItem = [
    {
      date: "10 September 2023",
      totalPrice: "32000",
    },
    {
      date: "12 September 2023",
      totalPrice: "21000",
    },
    {
      date: "16 September 2023",
      totalPrice: "12000",
    },
    {
      date: "19 September 2023",
      totalPrice: "27000",
    },
    {
      date: "26 September 2023",
      totalPrice: "67000",
    },
    {
      date: "01 October 2023",
      totalPrice: "16000",
    },
    {
      date: "04 October 2023",
      totalPrice: "19000",
    },
    {
      date: "05 October 2023",
      totalPrice: "27000",
    },
    {
      date: "06 October 2023",
      totalPrice: "30000",
    },
  ];

  return (
    <>
      <TopBar option head role="USER" />
      <div className={`${styles["order-history_container"]}`}>
        <div className="row w-100 border-top">
          <div
            className="col-md-5 p-3 border-end justify-content-center align-items-center"
            style={{ height: "90vh", overflowY: "auto" }}
          >
            <div className={`${styles["invoice-area"]} mx-auto`}>
              <section className="text-center p-2 mb-3">
                <span className={`${styles["invoice-title"]}`}>Invoice</span>
              </section>
              <section>
                <div className="mb-5">
                  {orderHistory.map((x, index) => (
                    <div
                      className="d-flex justify-content-between mb-2"
                      key={index}
                    >
                      <div>{`${x.name} X ${x.qty}`}</div>
                      <div>{`Rp. ${x.totalPrice}`}</div>
                    </div>
                  ))}
                </div>
                <div className={`${styles["invoice-total"]}`}>
                  Total : Rp. 47000
                </div>
                <div className="text-end">Order date: 24 October 2023</div>
                <div className="text-end"> Time order : 14.32</div>
              </section>
            </div>
          </div>
          <div
            className="col-md-7 px-5 text-center py-2"
            style={{ overflowY: "auto", height: "90vh" }}
          >
            <p className={`${stylesCart["order-summary_title"]} mb-3`}>
              Order history
            </p>
            {orderHistoryItem.map((x, index) => (
              <div
                className={`${styles["order-history-item"]} mx-auto mb-3`}
                onClick={() => alert("ok")}
                key={index}
              >
                <span className="d-block">{`Date order : ${x.date}`}</span>
                <span>{`total price : ${x.totalPrice}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
