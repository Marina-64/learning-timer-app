import React from "react"; 
import BtnNav from "@/components/BtnNav";
import Image from "next/image";


export default function Home() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return (
    <div>
      <div className="custom-container">
        <div className="text-center justify-center mt-8 text-box">
          <h2 className="text-xl">{year}/{month}/{date}</h2>
          <div className="flex text-center justify-center items-center p-6">
            <h2 className="text-xl">total</h2>
            <h1 className="font-semibold text-4xl text-center pl-4">01:30:00</h1>
          </div>
        </div>
          <Image
            src="/image0.png"
            width={500}
            height={800}
            objectFit={"cover"}
            alt="リンゴの木"
            className="img mb-16"
            />
      </div>
      <BtnNav/>
    </div>
  );
};
