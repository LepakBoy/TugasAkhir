import TopBar from "../../src/components/TopBar";
import { topBarMainMenuList } from "../../src/constant/topBar-menu";
import styles from "../../styles/main-user.module.scss";
import ButtonPrimaryComponent from "../../src/components/global/ButtonPrimaryComponent";
import { useCallback, useEffect, useState } from "react";
import {
  AddToCardOrderProps,
  MenuProps,
  defaultCartOrder,
  defaultMenu,
} from "../../src/interfaces/menus";

export default function MainUser() {
  const [selectedItem, setSelectedItem] = useState<MenuProps>(defaultMenu);
  const [cartOrder, setCartOder] = useState<AddToCardOrderProps>({
    ...defaultCartOrder,
    totalPrice: selectedItem.price,
  });

  const [allMenus, setAllMenus] = useState([]);
  const [renderedMenus, setRenderedMenus] = useState(allMenus);
  const [cartList, setCartList] = useState([]);

  const getAllMenu = useCallback(async () => {
    const req = await fetch("http://localhost:8002/api/menu/menuAlgoritma", {
      method: "GET",
    });

    await req
      .json()
      .then((res) => {
        setAllMenus(res.data);
      })
      .catch((err) => {
        setAllMenus([]);
        console.log(err, "erro");
      });
  }, []);

  const handleFilterByCategory = (cat: string) => {
    if (cat === "FORYOU") {
      alert("SAW algorithm implementation");
      return;
    }
    setRenderedMenus(allMenus.filter((x) => x.category === cat.toUpperCase()));
  };

  const handleAddToCart = (total: number) => {
    if (cartOrder.menuId && selectedItem.id) {
      setCartOder({
        ...cartOrder,
        totalPrice: total,
      });
      setCartList([...cartList, cartOrder]);
      localStorage.setItem(
        "cart-order",
        JSON.stringify([...cartList, cartOrder])
      );

      setSelectedItem(defaultMenu);
    }
  };

  useEffect(() => {
    if (allMenus.length) {
      setRenderedMenus(
        allMenus.filter((x) => {
          return x.category === "FOOD";
        })
      );
    }
  }, [allMenus]);

  useEffect(() => {
    getAllMenu();
    setCartList(JSON.parse(localStorage.getItem("cart-order")) || []);
  }, []);

  return (
    <>
      <TopBar option head role="USER" />
      <div className="row w-100 border-top">
        <div
          className={`${styles["menu-detail_container"]} col-md-4 border-end`}
        >
          <div className={`${styles["menu-detail_wrapper"]}`}>
            {selectedItem.id !== "" ? (
              <>
                <img
                  className={`${styles["menu-detail_image"]} mx-auto mb-2`}
                  src={`http://localhost:8002/images/menus/${selectedItem.image}.jpg`}
                  alt="detail-menu"
                />

                <p className={`${styles["menu-detail-parapgraph"]}`}>
                  {selectedItem.description}
                </p>
                <div
                  className={`${styles["menu-detail_qty"]} d-flex justify-content-center`}
                >
                  <button
                    onClick={() =>
                      setCartOder({
                        ...cartOrder,
                        qty: cartOrder.qty - 1,
                        totalPrice: cartOrder.totalPrice - selectedItem.price,
                      })
                    }
                    className={`${styles["menu-detail_qty-btn"]}`}
                    style={{ width: "32px" }}
                  >
                    -
                  </button>
                  <input
                    name="qty"
                    type="text"
                    value={cartOrder.qty || 0}
                    style={{
                      width: "32px",
                      textAlign: "center",
                      marginRight: "32px",
                      marginLeft: "32px",
                    }}
                  />
                  <button
                    onClick={() =>
                      setCartOder({
                        ...cartOrder,
                        qty: cartOrder.qty + 1,
                        totalPrice: cartOrder.totalPrice + selectedItem.price,
                      })
                    }
                    className={`${styles["menu-detail_qty-btn"]}`}
                    style={{ width: "32px" }}
                  >
                    +
                  </button>
                </div>
                <div className="mt-3">
                  <span>{`Total : Rp ${
                    selectedItem.price * cartOrder.qty
                  }`}</span>
                  <ButtonPrimaryComponent
                    onClick={() =>
                      handleAddToCart(selectedItem.price * cartOrder.qty)
                    }
                    label="Add to cart"
                    type="button"
                    style={{
                      width: "168px",
                      marginTop: "8px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <ButtonPrimaryComponent
                    onClick={() => {
                      setSelectedItem(defaultMenu);
                      setCartOder(defaultCartOrder);
                    }}
                    label="Remove"
                    type="button"
                    backGroundColor="#cfcfcf"
                    textColor="#6e6464"
                    style={{
                      width: "168px",
                      marginTop: "10px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <img
                  className={`${styles["menu-detail_image"]} mx-auto mb-2`}
                  src={`../../../images/no-image.jpg`}
                  alt="detail-menu"
                />
                <span>{selectedItem.name || "No selected item"}</span>
              </>
            )}
          </div>
        </div>
        <div className="col-md-8">
          <div
            className={`${styles["menu-category_list"]} p-3 d-flex justify-content-between`}
          >
            {topBarMainMenuList.map((x, i: number) => (
              <div className="p-1" key={i}>
                <span
                  className="cursor-pointer"
                  onClick={() => handleFilterByCategory(x.value)}
                >
                  {x.text}
                </span>
              </div>
            ))}
          </div>
          <div className={`${styles["menu-category_wrapper"]} row`}>
            {renderedMenus.length > 0 ? (
              <>
                {renderedMenus.map((x, i: number) => (
                  <div className="col-md-3 mb-4 p-1" key={i}>
                    <div
                      className={`${styles["menu-category_item"]} text-center position-relative`}
                    >
                      {!x.isAvailable && (
                        <div
                          className="position-absolute d-flex align-items-center justify-content-center"
                          style={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "#a5a39d",
                            opacity: 0.9,
                            color: "red",
                          }}
                        >
                          <span>Out of stock</span>
                        </div>
                      )}

                      <img
                        className={`${styles["menu-category_image"]}`}
                        src={`http://localhost:8002/images/menus/${x.image}.jpg`}
                        alt="menu"
                      />
                      <div
                        className="d-flex flex-column justify-content-between align-items-center"
                        style={{ minHeight: "112px" }}
                      >
                        <span className="d-block mb-1">{x.name}</span>
                        <div>
                          <span className={`${styles["menu-category_price"]}`}>
                            {"Rp " + x.price}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedItem({
                                id: x.id,
                                name: x.name,
                                price: x.price,
                                category: x.category,
                                description: x.description,
                                isAvailable: x.isAvailable,
                                image: x.image,
                                servingTime: x.servingTime,
                              });
                              setCartOder({
                                ...cartOrder,
                                image: x.image,
                                qty: 1,
                                name: x.name,
                                menuId: x.id,
                                totalPrice: x.price,
                                id: crypto.randomUUID(),
                              });
                            }}
                            className={`${styles["menu-category_button-select"]}`}
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <span className="text-center">No menu availabled</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
