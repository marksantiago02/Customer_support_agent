"use client";
import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import useStore from "@/utils/store";
import Image from "next/image";
import instance from "@/utils/instance";
import Spinner from "./Spinner";

interface data {
  issue: string;
  resolution: string;
  id: string;
  customer_name: string;
  customer_email: string;
  issue_description: string;
  resolution_description: string;
  confidence_score: number;
  date: string;
}

const ViewTickets = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { showView, setShowView } = useStore();
  const [data, setData] = useState<data>({
    issue: "",
    resolution: "",
    id: "",
    customer_name: "",
    customer_email: "",
    issue_description: "",
    resolution_description: "",
    confidence_score: 0,
    date: "",
  });

  const getRunData = (id: string) => {
    setLoading(true);
    instance
      .get(`/run/${id}`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setIsOpen(showView.show);
    if (showView.show) {
      getRunData(showView.id);
    }
  }, [showView.show]);

  const handleClose = () => {
    setShowView({
      id: "",
      show: false,
    });
  };

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } z-50 inset-0 flex items-center justify-center bg-black/30`}
    >
      <div className="bg-white w-11/12 lg:w-6/12 min-h-[40vh] relative overflow-y-scroll  flex flex-col items-center shadow-xl py-[5vh]">
        <div className=" absolute right-4 top-4">
          <button
            onClick={() => {
              handleClose();
            }}
          >
            <IoCloseOutline className=" text-black text-xl" />
          </button>
        </div>
        {loading ? (
          <div className=" h-[30vh] w-full flex  flex-col items-center justify-center">
            <Spinner loading={loading} height={30} width={5} color="#000000" />
          </div>
        ) : (
          <div className="flex flex-col items-start justify-start w-11/12">
            <p className=" text-black text-xl">Ticket Summary</p>
            <div className=" flex flex-row justify-start items-center border-[0.5px] border-[#c7c7c7] p-2 rounded-lg mt-4 gap-x-4 w-full">
              <div className=" relative h-[10vh] w-[10vw] rounded-xl group overflow-hidden">
                <Image
                  src="/keyboardimg.jpg"
                  layout="fill"
                  alt="product-image"
                  objectFit="contain"
                  className=" transition-all duration-200 group-hover:scale-110"
                />
              </div>

              <div className=" flex flex-col items-start">
                <p className=" text-sm text-black underline">Your Order</p>
                <div className=" flex flex-row justify-between items-center gap-x-2">
                  <p className="text-base text-black/70">Keybros Keyboard M3</p>
                  <IoMdClose className="text-black text-md" />

                  <p className="text-lg text-black/70">1</p>
                </div>

                <div className="text-lg text-black/70">$100</div>
              </div>
            </div>

            <div className=" flex flex-col items-start w-full bg-gray-100 mt-4 rounded-md px-4 py-2">
              <p className=" text-base text-black">Customer Information</p>
              <div className="flex flex-row justify-between items-center mt-2 w-full">
                <div className="flex flex-col items-start w-1/2">
                  <p className="text-sm text-black/50">Name</p>
                  <p className="text-sm text-black/70">
                    {data.customer_name || "NA"}
                  </p>
                </div>
                <div className="flex flex-col items-start w-1/2">
                  <p className="text-sm text-black/50">Email</p>
                  <p className="text-sm text-black/70">
                    {data.customer_email || "NA"}
                  </p>
                </div>
              </div>
            </div>

            <div className=" flex flex-col items-start w-full bg-gray-100 mt-4 rounded-md px-4 py-2">
              <p className=" text-base text-black">Complaint Raised</p>
              <div className="flex flex-col items-start mt-2 w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="text-sm text-black/50">Issue</p>
                  <p className="text-sm text-black/70">{data.issue || "NA"}</p>
                </div>
                <div className="flex flex-col items-start w-full mt-2">
                  <p className="text-sm text-black/50">Description</p>
                  <p className="text-sm text-black/70">
                    {data.issue_description || "NA"}
                  </p>
                </div>
              </div>
            </div>
            <div className=" flex flex-col items-start w-full bg-gray-100 mt-4 rounded-md px-4 py-2">
              <p className=" text-base text-black">Agent Resolution</p>
              <div className="flex flex-col items-start mt-2 w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="text-sm text-black/50">Resolution</p>
                  <p className="text-sm text-black/70">
                    {data.resolution || "NA"}
                  </p>
                </div>
                <div className="flex flex-col items-start w-full mt-2">
                  <p className="text-sm text-black/50">Description</p>
                  <p className="text-sm text-black/70">
                    {data.resolution_description || "NA"}
                  </p>
                </div>

                <div className="flex flex-col items-start h-full w-full mt-2">
                  <p className="text-sm text-black/50">Confidence Score</p>
                  <p className=" mt-1 text-sm text-black">
                    {data.confidence_score}%
                  </p>
                  <div className=" h-[12px] w-1/2 bg-white mt-1 relative rounded-md overflow-hidden border-[1px] border-[#c7c7c7]">
                    <div
                      className=" absolute h-[12px] rounded-lg bg-black "
                      style={{ width: `${data.confidence_score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTickets;
