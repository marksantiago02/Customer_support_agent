"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaHeadset } from "react-icons/fa6";
import useStore from "@/utils/store";
import instance from "@/utils/instance";
import Spinner from "@/components/Spinner";
import { IoEye } from "react-icons/io5";

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

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Array<data>>([]);
  const { showModal, setShowModal, setShowView } = useStore();

  const getList = () => {
    setLoading(true);
    instance
      .get("/list")
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (!showModal) {
      getList();
    }
  }, [showModal]);

  return (
    <main className="flex h-full xl:h-screen flex-col items-center justify-between bg-white">
      <div className=" w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center h-[10vh] px-8 border-b-[1px] border-[#c7c7c7]">
        <div className="flex flex-row items-center text-black text-xl lg:text-2xl font-semibold">
          Customer Support AI Agent
        </div>

        <div className=" flex flex-row justify-end gap-x-2 lg:gap-x-8">
          <a
            href=""
            className="text-black text-sm p-1 lg:p-2 rounded-md bg-gray-200"
          >
            Github
          </a>
          <a
            href=""
            className="text-black text-sm p-1 lg:p-2 rounded-md bg-gray-200"
          >
            Demo Video
          </a>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row justify-between items-center h-full xl:h-[90vh] w-full">
        <div className="flex flex-col items-center justify-center w-full xl:w-7/12 border-r-[1px] h-full border-[#c7c7c7] ">
          <div className="flex flex-col items-start justify-start w-full h-full p-8">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex flex-col items-start justify-start w-full">
                <div className="text-xl font-semibold text-start text-black">
                  Welcome to the demo of Customer Support AI Agent
                </div>
                <div className="text-sm text-start text-black">
                  {
                    "Below you will find an example of an order a customer might have placed and we will take a look at how the AI Agent can help you with the customer's query."
                  }
                </div>
              </div>

              <div className=" w-full flex flex-col items-start justify-start px-4 py-4 border-[1px] border-[#c7c7c7] mt-[2.5vh] rounded-lg">
                <div className=" grid grid-cols-2 gap-y-4 lg:gap-0 lg:flex lg:flex-row w-full justify-between items-start border-b-[0.5px] border-[#c7c7c7] pb-2 px-4">
                  <div className="flex flex-col items-center justify-center">
                    <p className=" text-sm text-black/50">Order Id</p>
                    <p className=" text-base text-black/90">#12345</p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <p className=" text-sm text-black/50">Order Date</p>
                    <p className=" text-base text-black/90">12th Oct 2021</p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <p className=" text-sm text-black/50">Order Total</p>
                    <p className=" text-base text-black/90">$100</p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <p className=" text-sm text-black/50">Order Status</p>
                    <p className=" text-base text-green-400">Delivered</p>
                  </div>
                </div>

                <div className=" flex w-full flex-col lg:flex-row justify-between items-center py-8">
                  <div className=" flex flex-row justify-center items-center gap-x-4">
                    <div className=" relative h-[15vh] w-[20vw] lg:h-[12vh] lg:w-[12.5vw] rounded-xl group overflow-hidden">
                      <Image
                        src="/keyboardimg.jpg"
                        layout="fill"
                        alt="product-image"
                        objectFit="contain"
                        className=" transition-all duration-200 group-hover:scale-110"
                      />
                    </div>

                    <div className=" flex flex-col items-start">
                      <div className=" flex flex-row justify-between items-center gap-x-2">
                        <p className="text-base text-black/70">
                          Keybros Keyboard M3
                        </p>
                        <IoMdClose className="text-black text-md" />

                        <p className="text-lg text-black/70">1</p>
                      </div>

                      <div className=" text-sm lg:text-lg text-black/70">
                        $100
                      </div>
                      <p className=" text-base text-green-400">Delivered</p>
                    </div>
                  </div>

                  <div className=" flex flex-col items-start">
                    <button
                      onClick={() => {
                        setShowModal(true);
                      }}
                      className="text-black text-sm py-3 px-8 gap-x-2 rounded-md bg-gray-200 flex flex-row justify-center items-center"
                    >
                      <FaHeadset className="text-black text-xl" />
                      <p className="text-black text-sm">Contact Support</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start p-4 min-h-[50vh] h-full w-full xl:w-5/12 ">
          <p className="text-xl font-semibold text-start text-black">
            AI Agent Action
          </p>
          <p className="text-xs w-8/12 text-start text-black">
            {
              " Below are the examples of past customer support queries raised and how the AI Agent responded to them."
            }
          </p>

          <div className="flex flex-col items-start justify-start w-full mt-4">
            {loading ? (
              <div className=" h-[30vh] w-full flex  flex-col items-center justify-center">
                <Spinner
                  loading={loading}
                  height={30}
                  width={5}
                  color="#000000"
                />
              </div>
            ) : (
              <div
                id="address"
                className=" flex flex-col items-start w-full gap-y-2 max-h-[75vh] overflow-y-scroll"
              >
                {data.map((item, index) => (
                  <div
                    key={index}
                    className=" flex flex-col items-start justify-start w-full px-4 py-2 border-[1px] border-[#c7c7c7] rounded-lg"
                  >
                    <div className=" flex flex-row w-full justify-between items-center">
                      <div className=" flex flex-col items-start justify-start w-[25%]">
                        <p className=" text-xs text-black/50">Issue</p>
                        <p className=" text-sm text-black/90">{item.issue}</p>
                      </div>
                      <div className=" flex flex-col items-start justify-start w-[25%]">
                        <p className=" text-xs text-black/50">Resolution</p>
                        <p className=" text-sm text-black/90">
                          {item.resolution}
                        </p>
                      </div>

                      <div className=" flex flex-col items-start justify-start w-[25%]">
                        <p className=" text-xs text-black/50">Score</p>
                        <p className=" text-sm text-black/90">
                          {item.confidence_score}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setShowView({
                            id: item.id,
                            show: true,
                          });
                        }}
                        className="text-black text-sm py-2 px-2 gap-x-2 rounded-md bg-gray-200 flex flex-row justify-center items-center"
                      >
                        <IoEye className="text-black text-lg" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
