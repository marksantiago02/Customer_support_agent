"use client";
import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import useStore from "@/utils/store";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import instance from "@/utils/instance";

const options = [
  {
    issue: "Product Defects",
    value: "Product Defects",
  },
  {
    issue: "Quality Issues",
    value: "Quality Issues",
  },
  {
    issue: "Incorrect Item",
    value: "Incorrect Item",
  },
  {
    issue: "Service Issues",
    value: "Service Issues",
  },
  {
    issue: "Product Not as Described",
    value: "Product Not as Described",
  },
  {
    issue: "Price Issues",
    value: "Price Issues",
  },
  {
    issue: "Packaging Issues",
    value: "Packaging Issues",
  },
  {
    issue: "Functionality Problems",
    value: "Functionality Problems",
  },
];

interface Issue {
  issue: string;
  issue_description: string;
  customer_name: string;
  customer_email: string;
}

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

const CustomerSupport = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const { showModal, setShowModal } = useStore();
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<data>({
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      issue: "",
      customer_name: "Sample User",
      customer_email: "sampleuser@gmail.com",
      issue_description: "",
    },
  });

  const onSubmit = (data: Issue) => {
    setLoading(true);
    instance
      .post("/create", data)
      .then((res) => {
        setLoading(false);
        setShowResult(true);
        setResultData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setIsOpen(showModal);
  }, [showModal]);

  const handleClose = () => {
    setShowModal(false);
    setShowResult(false);
    setResultData({
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
    reset();
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
            <p className=" text-sm text-black w-8/12 text-center">
              {
                "We're sorry for the issue you are facing , our agents are looks for the best resolution for you"
              }
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-start justify-start w-11/12">
            <p className=" text-black text-xl">Your Order</p>
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
                <div className=" flex flex-row justify-between items-center gap-x-2">
                  <p className="text-base text-black/70">Keybros Keyboard M3</p>
                  <IoMdClose className="text-black text-md" />

                  <p className="text-lg text-black/70">1</p>
                </div>

                <div className="text-lg text-black/70">$100</div>
                <p className=" text-base text-green-400">Delivered</p>
              </div>
            </div>

            {showResult ? (
              <div className=" flex flex-col items-start justify-center bg-gray-200 mt-4 p-4 w-full rounded-lg ">
                <p className=" text-black text-base">{`Hi ${
                  resultData.customer_name || "NA"
                },`}</p>
                <p className=" text-black text-base mt-1">
                  Resolution : {resultData.resolution || "No Resolution Found"}
                </p>

                <p className=" text-black text-sm mt-1">
                  After careful resolution we have decided to{" "}
                  {resultData.resolution_description}
                </p>

                <p className=" text-black text-sm mt-2">Regards</p>
                <p className=" text-black text-sm">Team Customer Support</p>
              </div>
            ) : (
              <div className=" flex flex-col items-start w-full mt-4">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=" flex flex-col items-start w-full"
                >
                  <div className="w-full flex flex-col items-end">
                    <a
                      onClick={() => setAdvanced(!advanced)}
                      className="text-black text-sm underline cursor-pointer"
                    >
                      {advanced ? "Hide" : "Show"} Advanced Details
                    </a>
                  </div>
                  {advanced ? (
                    <div className=" p-4 bg-gray-200 rounded-lg w-full flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-2">
                      <div className=" flex flex-col items-start w-full">
                        <p className=" text-black text-xs">Customer Name</p>
                        <input
                          {...register("customer_name", { required: true })}
                          placeholder="Customer Name"
                          className=" w-full border-[0.5px] border-[#c7c7c7] text-black rounded-lg p-2"
                        />
                        {errors.customer_name && (
                          <p className=" text-red-500 text-xs">
                            This field is required
                          </p>
                        )}
                      </div>

                      <div className=" flex fflex flex-col items-start w-full mt-4 lg:mt-0">
                        <p className=" text-black text-xs">Customer Email</p>
                        <input
                          {...register("customer_email", { required: true })}
                          placeholder="Customer Email"
                          className=" w-full border-[0.5px] border-[#c7c7c7] text-black rounded-lg p-2"
                        />
                        {errors.customer_email && (
                          <p className=" text-red-500 text-xs">
                            This field is required
                          </p>
                        )}
                      </div>
                    </div>
                  ) : null}
                  <p className=" text-black text-sm mt-2">
                    Please select the issue{" "}
                  </p>
                  <select
                    {...register("issue", { required: true })}
                    className=" w-full border-[0.5px] border-[#c7c7c7] text-black rounded-lg p-2"
                  >
                    <option defaultChecked value="1">
                      Select Issue
                    </option>
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.issue}
                      </option>
                    ))}
                  </select>
                  {errors.issue && (
                    <p className=" text-red-500 text-xs">
                      This field is required
                    </p>
                  )}

                  <p className=" text-black text-sm mt-4">
                    Describe your issue
                  </p>
                  <textarea
                    {...register("issue_description", { required: true })}
                    placeholder="Describe your issue"
                    className=" w-full border-[0.5px] h-[20vh] border-[#c7c7c7] text-black rounded-lg p-2 "
                  ></textarea>
                  {errors.issue_description && (
                    <p className=" text-red-500 text-xs">
                      This field is required
                    </p>
                  )}

                  <div className=" flex flex-row justify-end items-center w-full mt-4">
                    <button
                      type="submit"
                      className=" text-white text-sm py-3 px-8 gap-x-2 rounded-md bg-black flex flex-row justify-center items-center"
                    >
                      <p>Submit</p>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSupport;
