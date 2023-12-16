import TopBar from "../../src/components/TopBar";
import cartStyles from "../../styles/cart.module.scss";
import ButtonComponent from "../../src/components/global/ButtonPrimaryComponent";
import { useRouter } from "next/router";

export default function AdminPage() {
  const router = useRouter();
  return (
    <>
      <TopBar option head role="ADMIN" />
      <div className="row w-100 border-top" style={{ height: "100%" }}>
        <div
          className={`${cartStyles["cart-list_container"]} text-center col-md-6 mx-auto border-end border-start`}
        >
          <div className={`${cartStyles["cart-wrapper"]} py-3`}>
            <div className="mb-5">
              <span className={`${cartStyles["order-summary_title"]}`}>
                {`Welcome on board, Admin!`}
              </span>
              <ButtonComponent
                onClick={() => router.push("/admin/create-user")}
                style={{
                  width: "162px",
                  height: "48px",
                  fontSize: "18px",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginTop: "22px",
                }}
                type="button"
                label="Create user"
              />
              <ButtonComponent
                onClick={() => router.push("/admin/update-menu")}
                style={{
                  width: "162px",
                  height: "48px",
                  fontSize: "18px",
                  marginRight: "auto",
                  marginLeft: "auto",
                  marginTop: "22px",
                }}
                type="button"
                label="Update menu"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
