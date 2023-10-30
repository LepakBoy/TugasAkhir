import TopBar from "../../src/components/TopBar";

export default function UpdateStock() {
  const orderList = ["aa", "bb", "cc", "dd", "ee", "ff"];

  return (
    <>
      <TopBar option head role="KITCHEN" ordeListNumber={orderList.length} />

      <span>update stock</span>
    </>
  );
}
