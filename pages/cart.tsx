import CartItem from "../src/components/CartItem";
import TopBar from "../src/components/TopBar";
import styles from "../styles/cart.module.scss";
import ButtonComponent from "../src/components/global/ButtonPrimaryComponent";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const handleDeleteCart = (idCart: string) => {
    setCartList(cartList.filter((x) => x.id !== idCart));
    localStorage.setItem(
      "cart-order",
      JSON.stringify(cartList.filter((x) => x.id !== idCart))
    );
  };

  useEffect(() => {
    setCartList(JSON.parse(localStorage.getItem("cart-order")) || []);
  }, []);

  return (
    <>
      <TopBar option head />
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
                    totalPrice={cart.totalPrice}
                    idMenu={cart.id}
                    key={index}
                    menu={cart.name}
                    qty={cart.qty}
                    handleDeleteCart={handleDeleteCart}
                  />
                ))}
                <div className="px-5 text-end">
                  <p className={`${styles["cart-item_total"]} px-5`}>
                    {"Total : Rp 100000"}
                  </p>
                </div>
                <div className="d-flex justify-content-center py-2 mb-4">
                  <ButtonComponent
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
