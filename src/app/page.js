import Image from "next/image";
import DtfImage from "@/component/DtfImage";
import DTFDetail from "@/component/DTFDetail";
export default function Home() {
  return (
    <div className="w-10/12 mx-auto flex justify-between pt-10 relative">
      <div className="w-2/4 ">
        <DtfImage />
      </div>
      <div className="w-2/4">
        <DTFDetail />
      </div>
    </div>
  );
}
