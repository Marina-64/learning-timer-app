import React from "react";
import BtnNav from "@/components/BtnNav";
import Image from "next/image";

const HomeBody = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return (
    <div>
      <div className="text-center justify-center mt-12">
        <h2 className="heading-4">
          {year}/{month}/{date}
        </h2>
        <h1 className="heading-1 m-6">Total Time ●●：●●</h1>
        <Image
          src="/appleTree.jpg"
          alt="appleTree.jpg"
          width={360}
          height={520}
          className="inline-block"
        />
      </div>
      <BtnNav />
    </div>
  );
};

export default HomeBody;
