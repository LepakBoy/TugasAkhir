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
        <div className="col-md-5 border-end">adadad</div>
        <div className="col-md-7">dasds</div>
      </div>
    </>
  );
}
