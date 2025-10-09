import Image from "next/image";
import DtfImage from "@/component/DtfImage";
import DTFDetail from "@/component/DTFDetail";
export default function Home() {
  return (
    <div className="w-10/12 mx-auto md:flex block gap-10 justify-between pt-10 relative">
      <div className="w-4/4 md:w-2/4 ">
        <DtfImage />
      </div>
      <div className="w-4/4 md:w-2/4 pt-10 md:pt-0 ">
        <DTFDetail />
      </div>
    </div>
  );
}
