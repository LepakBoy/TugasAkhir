import TopBar from "../../src/components/TopBar";
import ButtonPrimaryComponent from "../../src/components/global/ButtonPrimaryComponent";
import styleUser from "../../styles/main-user.module.scss";
import { useEffect, useState } from "react";
import { MenuProps, defaultMenu } from "../../src/interfaces/menus";

export default function OrderHistory() {
  const [allMenus, setAllMenus] = useState([]);
  const [selectedItem, setSelectedItem] = useState<MenuProps>(defaultMenu);

  const orderList = ["aa", "bb", "cc", "dd", "ee", "ff"];

  const getAllMenu = async () => {
    // ####### ERROR HANDLING IF SERVER IS NOT AVAILABLE ##############
    const req = await fetch("http://localhost:8002/api/menu", {
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
  };

  useEffect(() => {
    getAllMenu();
  }, []);

  return (
    <>
      <TopBar option head role="KITCHEN" ordeListNumber={orderList.length} />
      <div className="row w-100 border-top">
        <div
          className={`${styleUser["menu-detail_container"]} col-md-4 border-end`}
        >
          <div className={`${styleUser["menu-detail_wrapper"]}`}>
            {selectedItem.id !== "" ? (
              <>
                <img
                  className={`${styleUser["menu-detail_image"]} mx-auto mb-2`}
                  src={`http://localhost:8002/images/menus/${selectedItem.image}.jpg`}
                  alt="detail-menu"
                />
                <span>{selectedItem.name || "No selected item"}</span>
                <p className={`${styleUser["menu-detail-parapgraph"]}`}>
                  {`This menu is ${
                    selectedItem.isAvailable ? "Available" : "Unavailable"
                  }`}
                </p>
                <div className="mt-3">
                  <ButtonPrimaryComponent
                    label={`Change into ${
                      selectedItem.isAvailable ? "Unvailable" : "Available"
                    }`}
                    type="button"
                    style={{
                      width: "258px",
                      marginTop: "8px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <img
                  className={`${styleUser["menu-detail_image"]} mx-auto mb-2`}
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
            className={`${styleUser["menu-category_list"]} p-3 d-flex justify-content-between`}
          ></div>
          <div className={`${styleUser["menu-category_wrapper"]} row`}>
            {allMenus.map((x, i: number) => (
              <div className="col-md-3 mb-4 p-1" key={i}>
                <div
                  className={`${styleUser["menu-category_item"]} text-center position-relative`}
                >
                  <span
                    className="position-absolute"
                    style={{
                      top: "10px",
                      right: "10px",
                      backgroundColor: "#cfcfcf",
                      padding: "4px",
                      borderRadius: "3px",
                    }}
                  >
                    {x.isAvailable ? "Available" : "Unvailable"}
                  </span>
                  <img
                    className={`${styleUser["menu-category_image"]}`}
                    src={`http://localhost:8002/images/menus/${x.image}.jpg`}
                    alt="menu"
                  />
                  <div
                    className="d-flex flex-column justify-content-between align-items-center"
                    style={{ minHeight: "112px" }}
                  >
                    <span className="d-block mb-1">{x.name}</span>
                    <div>
                      <button
                        onClick={() =>
                          setSelectedItem({
                            id: x.id,
                            name: x.name,
                            price: x.price,
                            category: x.category,
                            description: x.description,
                            isAvailable: x.isAvailable,
                            image: x.image,
                          })
                        }
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
