import CartItem from "../src/components/CartItem";
import TopBar from "../src/components/TopBar";
import styles from "../styles/cart.module.scss";
import ButtonComponent from "../src/components/global/ButtonPrimaryComponent";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const handleDeleteCart = (idCart: string) => {
    setCartList(cartList.filter((x) => x.id !== idCart));
    localStorage.setItem(
      "cart-order",
      JSON.stringify(cartList.filter((x) => x.id !== idCart))
    );
  };

  const totalToPay = cartList.reduce((x, y) => {
    return x + y.totalPrice;
  }, 0);

  const totalQty = cartList.reduce((x, y) => {
    return x + y.qty;
  }, 0);

  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem("cart-order")) || []);
  }, []);
  let b = [];

  if (cartList.length > 0) {
    for (let i = 0; i < cartList.length; i++) {
      const obj = {
        menuId: cartList[i].menuId,
        qty: cartList[i].qty,
        price: cartList[i].totalPrice,
        createdDate: new Date(),
      };

      b.push(obj);
    }
  }

  const orderPayload = {
    userId: typeof window !== "undefined" && localStorage.getItem("userId"),
    totalPrice: totalToPay,
    status: "PLACED",
    totalQty: totalQty,
    orderDetails: b,
  };
  // console.log(totalQty, orderPayload, "total qty");
  console.log(orderPayload, "cart list");

  const handleOrder = async () => {
    const req = await fetch("http://localhost:8002/api/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    await req.json().then((res) => {
      if (res.message === "success") {
        // localStorage.removeItem("cart-order");
        // setCartList([]);
        Swal.fire({
          title: "Success",
          text: "your order has been placed",
          icon: "success",
          timer: 5000,
        }).then((res) => {
          localStorage.removeItem("cart-order");
          setCartList([]);
        });
      }
    });
  };

  return (
    <>
      <TopBar option head role="USER" />
      <div className="row w-100 border-top" style={{ height: "100%" }}>
        <div
          className={`${styles["cart-list_container"]} col-md-6 mx-auto border-end border-start`}
        >
          <div className={`${styles["cart-wrapper"]}`}>
            <div className="mb-5">
              <span className={`${styles["order-summary_title"]}`}>
                Order summary
              </span>
            </div>

            {cartList && cartList.length > 0 ? (
              <>
                {cartList.map((cart: any, index: number) => (
                  <CartItem
                    image={cart.image}
                    totalPrice={cart.totalPrice}
                    idMenu={cart.id}
                    key={index}
                    menu={cart.name}
                    qty={cart.qty}
                    handleDeleteCart={handleDeleteCart}
                  />
                ))}
                <div className="px-5 text-end">
                  <p className={`${styles["cart-item_total"]}`}>
                    {`Total : ${totalToPay}`}
                  </p>
                </div>
                <div className="d-flex justify-content-center py-2 mb-4">
                  <ButtonComponent
                    onClick={handleOrder}
                    type="submit"
                    style={{ width: "200px" }}
                    label="Confirm and pay"
                  />
                </div>
              </>
            ) : (
              <div className="text-center">No cart</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
