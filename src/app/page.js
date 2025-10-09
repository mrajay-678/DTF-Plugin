import Image from "next/image";
import DtfImage from "@/component/DtfImage";
import DTFDetail from "@/component/DTFDetail";
export default function Home() {
  return (
    <div className="w-10/12 mx-auto md-flex flex justify-between pt-10 relative">
      <div className="md-w-2/4 w-2/4 ">
        <DtfImage />
      </div>
      <div className="md-w-2/4 w-2/4 md-pt-10  ">
        <DTFDetail />
      </div>
    </div>
  );
}
