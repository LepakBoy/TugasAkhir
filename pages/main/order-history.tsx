import TopBar from "../../src/components/TopBar";
import ButtonPrimaryComponent from "../../src/components/global/ButtonPrimaryComponent";
import styleUser from "../../styles/main-user.module.scss";
import { allMenu } from "../../src/constant/all-menu";
import { useState } from "react";
import { MenuProps, defaultMenu } from "../../src/interfaces/menus";

export default function OrderHistory() {
  const [allMenuList, setAllMenuList] = useState(allMenu);
  const [selectedItem, setSelectedItem] = useState<MenuProps>(defaultMenu);
  const selectedImage = selectedItem.name ? "french-fries.jpg" : "no-image.jpg";

  return (
    <>
      <TopBar option head role="USER" />
      <div className="row w-100 border-top">
        <div
          className={`${styleUser["menu-detail_container"]} col-md-4 border-end`}
        >
          <div className={`${styleUser["menu-detail_wrapper"]}`}>
            <img
              className={`${styleUser["menu-detail_image"]} mx-auto mb-2`}
              src={`../../../images/${selectedImage}`}
              alt="detail-menu"
            />
            <span>{"No selected item"}</span>
            {selectedItem.name && (
              <>
                <p className={`${styleUser["menu-detail-parapgraph"]}`}>
                  {"selectedItem.description"}
                </p>
                <div
                  className={`${styleUser["menu-detail_qty"]} d-flex justify-content-center`}
                >
                  <button
                    // onClick={() =>
                    //   setCartOder({
                    //     ...cartOrder,
                    //     qty: cartOrder.qty - 1,
                    //     totalPrice: cartOrder.totalPrice - selectedItem.price,
                    //   })
                    // }
                    className={`${styleUser["menu-detail_qty-btn"]}`}
                    style={{ width: "32px" }}
                  >
                    -
                  </button>
                  <input
                    name="qty"
                    type="text"
                    // value={cartOrder.qty || 0}
                    style={{
                      width: "32px",
                      textAlign: "center",
                      marginRight: "32px",
                      marginLeft: "32px",
                    }}
                  />
                  <button
                    // onClick={() =>
                    //   setCartOder({
                    //     ...cartOrder,
                    //     qty: cartOrder.qty + 1,
                    //     totalPrice: cartOrder.totalPrice + selectedItem.price,
                    //   })
                    // }
                    className={`${styleUser["menu-detail_qty-btn"]}`}
                    style={{ width: "32px" }}
                  >
                    +
                  </button>
                </div>
                <div className="mt-3">
                  {/* <span>{`Total : Rp ${
                    selectedItem.price * cartOrder.qty
                  }`}</span> */}
                  <ButtonPrimaryComponent
                    // onClick={() =>
                    //   handleAddToCart(selectedItem.price * cartOrder.qty)
                    // }
                    label="Update into {unvailable}"
                    type="button"
                    style={{
                      width: "168px",
                      marginTop: "8px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <div
            className={`${styleUser["menu-category_list"]} p-3 d-flex justify-content-between`}
          >
            {/* {topBarMainMenuList.map((x, i: number) => (
              <div className="p-1" key={i}>
                <span
                  className="cursor-pointer"
                  onClick={() => handleFilterByCategory(x.value)}
                >
                  {x.text}
                </span>
              </div>
            ))} */}
          </div>
          <div className={`${styleUser["menu-category_wrapper"]} row`}>
            {allMenuList.map((x, i: number) => (
              <div className="col-md-3 mb-4 p-1" key={i}>
                <div
                  className={`${styleUser["menu-category_item"]} text-center`}
                >
                  <img
                    className={`${styleUser["menu-category_image"]}`}
                    src="../../../images/burger.jpg"
                    alt="menu"
                  />
                  <div
                    className="d-flex flex-column justify-content-between align-items-center"
                    style={{ minHeight: "112px" }}
                  >
                    <span className="d-block mb-1">{x.name}</span>
                    <div>
                      {/* <span className={`${styleUser["menu-category_price"]}`}>
                        {"Rp " + x.price}
                      </span> */}
                      <button
                        // onClick={() => {
                        //   setSelectedItem({
                        //     id: x.id,
                        //     name: x.name,
                        //     price: x.price,
                        //     category: x.category,
                        //     description: x.description,
                        //   });
                        //   setCartOder({
                        //     ...cartOrder,
                        //     qty: 1,
                        //     name: x.name,
                        //     idMenu: x.id,
                        //     totalPrice: x.price,
                        //     id: crypto.randomUUID(),
                        //   });
                        // }}
                        className={`${styleUser["menu-category_button-select"]}`}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
