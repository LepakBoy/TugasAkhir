import TopBar from "../../src/components/TopBar";
import cartStyles from "../../styles/cart.module.scss";
import ButtonComponent from "../../src/components/global/ButtonPrimaryComponent";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function OpenClose() {
  const orderList = ["aa", "bb", "cc", "dd", "ee", "ff"];
  const [isCanteenOpen, setIsCanteenOpen] = useState(false);

  const getStatusCanteen = async () => {
    const req = await fetch("http://localhost:8002/api/auth/canteen-status", {
      method: "GET",
    });

    req.json().then((res) => {
      if (res.message === "success") {
        setIsCanteenOpen(res.canteenStatus);
      }
    });
  };

  const handleUpdateStatus = async () => {
    const req = await fetch(
      "http://localhost:8002/api/auth/update-canteen-status",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    req.json().then((res) => {
      if (res.message === "success") {
        Swal.fire({
          title: "Success",
          text: "Canteen status updated",
          icon: "success",
          timer: 5000,
        });
        getStatusCanteen();
      }
    });
  };

  useEffect(() => {
    getStatusCanteen();
  }, []);

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
                {`Your canteen is "${isCanteenOpen ? "Open" : "Close"}" now!`}
              </span>
              <ButtonComponent
                onClick={handleUpdateStatus}
                style={{
                  width: "162px",
                  height: "48px",
                  fontSize: "18px",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginTop: "22px",
                }}
                type="button"
                label={`${isCanteenOpen ? "Close" : "Open"} it !`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
