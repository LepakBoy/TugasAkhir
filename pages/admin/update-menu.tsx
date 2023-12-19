import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TopBar from "../../src/components/TopBar";
import styleUser from "../../styles/main-user.module.scss";
import { MenuProps, defaultMenu } from "../../src/interfaces/menus";
import ButtonPrimaryComponent from "../../src/components/global/ButtonPrimaryComponent";
import InputComponent from "../../src/components/global/InputComponent";
import Swal from "sweetalert2";

export default function UpdateMenu() {
  const router = useRouter();
  const [allMenus, setAllMenus] = useState([]);
  const [selectedItem, setSelectedItem] = useState<MenuProps>(defaultMenu);
  const roleOption = ["FOOD", "DRINKS", "SNACK", "ADDON"];

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

  const handleUpdateData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedItem({ ...selectedItem, [e.target.name]: e.target.value });
  };

  const handleUpdateMenu = async () => {
    const req = await fetch("http://localhost:8002/api/menu/update-menu", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedItem),
    });
    const { name, price, description, servingTime } = selectedItem;
    if (!name || !price || price <= 0 || !description || !servingTime) {
      Swal.fire({
        title: "Oops..",
        text: "Please fill all field",
        icon: "error",
      });
    } else {
      await req.json().then((res) => {
        if (res.message === "success") {
          Swal.fire({
            title: "Success",
            text: "Menu has been updated",
            icon: "success",
            timer: 5000,
          }).then((after) => {
            getAllMenu();
            setSelectedItem(defaultMenu);
          });
        }
      });
    }
  };

  useEffect(() => {
    getAllMenu();
  }, []);

  return (
    <>
      <TopBar option head role="ADMIN" />
      <div className="row w-100 border-top">
        <div
          className={`${styleUser["menu-detail_container"]} col-md-4 border-end`}
          style={{ overflowY: "auto", height: "90vh" }}
        >
          <>
            {selectedItem.id !== "" ? (
              <div style={{ width: "228px" }}>
                <img
                  className={`${styleUser["menu-detail_image"]} mx-auto mb-3`}
                  src={`http://localhost:8002/images/menus/${selectedItem.image}.jpg`}
                  alt="detail-menu"
                />
                <div className="mx-0 pb-5">
                  <InputComponent
                    type="text"
                    name="name"
                    label="Name"
                    value={selectedItem.name}
                    onChange={(e) => handleUpdateData(e)}
                    // onChange={formik.handleChange}
                    // value={formik.values.name}
                    errorMessage={
                      !selectedItem.name && "Please input this field"
                    }
                  />
                  <InputComponent
                    type="number"
                    style={{ marginTop: "12px" }}
                    name="price"
                    label="Price"
                    value={selectedItem.price.toString()}
                    onChange={(e) => handleUpdateData(e)}
                    // onChange={formik.handleChange}
                    // value={formik.values.price.toString()}
                    errorMessage={
                      !selectedItem.price && "Please input this field"
                    }
                  />
                  <div className="my-3">
                    <label htmlFor="categoryMenu">Category</label>
                    <select
                      onChange={(e) => handleUpdateData(e)}
                      name="category"
                      id="categoryMenu"
                      style={{ height: "38px", width: "100%" }}
                    >
                      {roleOption.map((x) => (
                        <option
                          value={x.toUpperCase()}
                          selected={x === selectedItem.category}
                        >
                          {x}
                        </option>
                      ))}
                    </select>
                  </div>
                  <InputComponent
                    type="number"
                    style={{ marginTop: "12px" }}
                    name="servingTime"
                    label="Serving time"
                    value={selectedItem.servingTime.toString()}
                    onChange={(e) => handleUpdateData(e)}
                    // onChange={formik.handleChange}
                    // value={formik.values.servingTime.toString()}
                    errorMessage={
                      !selectedItem.servingTime && "Please input this field"
                    }
                  />
                  <div style={{ marginTop: "12px" }}>
                    <label htmlFor="">Description</label>
                    <textarea
                      name="description"
                      id=""
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          [e.target.name]: e.target.value,
                        })
                      }
                      style={{ width: "228px" }}
                      cols={30}
                      rows={4}
                      value={selectedItem.description}
                      // onChange={formik.handleChange}
                      // value={formik.values.name}
                    />
                  </div>
                  <ButtonPrimaryComponent
                    onClick={handleUpdateMenu}
                    label="Update data"
                    type="button"
                    style={{ width: "100%", marginTop: "22px" }}
                  />
                  <ButtonPrimaryComponent
                    label="Back to home"
                    backGroundColor="#cfcfcf"
                    textColor="#6e6464"
                    type="button"
                    style={{ width: "100%", marginTop: "8px" }}
                    onClick={() => router.push("/admin")}
                  />
                </div>
              </div>
            ) : (
              <div>
                <img
                  className={`${styleUser["menu-detail_image"]} mx-auto mb-2`}
                  src={`../../../images/no-image.jpg`}
                  alt="detail-menu"
                />
                <span className="text-center">
                  {selectedItem.name || "No selected item"}
                </span>
              </div>
            )}
          </>
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
                            servingTime: x.servingTime,
                          })
                        }
                        // onClick={() => router.push(`/update-menu/${selectedItem.id}`)}
                        className={`${styleUser["menu-category_button-select"]}`}
                      >
                        Update
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
