import Layout from "@/components/layout";
import Head from "next/head";
import { useState } from "react";
import { ERC20Sender, ERC20 } from "../utils";
import { useContractWrite } from "wagmi";
import Papa from "papaparse";
import { parseEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
export default function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const {
    write: sendERC20,
    isLoading: transactionLoading,
    isError: transactionError,
    isSuccess: transactionSuccess,
  } = useContractWrite({
    address: ERC20Sender.address,
    abi: ERC20Sender.abi,
    functionName: "sendPayment",
    value: parseEther("0.05"),
  });

  const changeHandler = (event: any) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results: any) {
        const rowsArray: any = [];
        const valuesArray: any = [];

        // Iterating data to get column name and their values
        results.data.map((d: any) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  const handleSend = () => {
    let data = parsedData.map(
      (d: any) =>
        (d = {
          to: d["Email"],
          address: d["Receiving Address"],
          amount: d["Amount"],
          destinationChain: d["Chain"],
          dateAndTime: Date.now().toLocaleString(),
          tokenSymbol: d["Token Symbol"],
        })
    );

    axios
      .post("https://xcel-email-service.onrender.com/send-emails", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    const groupedData = parsedData.reduce((acc: any, curr: any) => {
      const chain = curr["Chain"];
      if (!acc[chain]) {
        acc[chain] = [];
      }
      acc[chain].push({
        receiver: curr["Receiving Address"],
        amount: curr["Amount"],
        paymentId: curr["Token Symbol"],
      });
      return acc;
    }, {});

    console.log(groupedData);

    Object.keys(groupedData).map((chain) => {
      const data = groupedData[chain];
      const receivers = data.map((d: any) => d.receiver);
      const amounts = data.map((d: any) => parseInt(d.amount));
      const symbol = data[0].paymentId;

      sendERC20({
        args: [
          receivers,
          amounts,
          chain,
          0x8bcc2cb0291e00e5f6a7c9929d7c4d33bf552551,
          symbol,
        ],
      });
    });
  };

  return (
    <>
      <Head>
        <title>Make Payments - XCELS</title>
        <meta name="title" content="XCELS" />
        <meta name="description" content="XCELS" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://shards.vercel.app/meta-image.jpg"
        />
        <meta property="og:title" content="XCELS" />
        <meta property="og:description" content="XCELS" />
        <meta
          property="og:image"
          content="https://shards.vercel.app/meta-image.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://shards.vercel.app/" />
        <meta property="twitter:title" content="XCELS" />
        <meta property="twitter:description" content="XCELS" />
        <meta
          property="twitter:image"
          content="https://shards.vercel.app/meta-image.jpg"
        />
      </Head>

      <Layout>
        {/* CSV file upload + Display Component to be here */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Make Payments
              <div className="text-sm font-normal">Powered by Axelar</div>
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <ConnectButton />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <label
            className="block mb-2 text-sm font-medium bg-white text-gray-900"
            htmlFor="large_size"
          >
            Upload CSV File
          </label>
          <input
            name="file"
            accept=".csv"
            onChange={changeHandler}
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            type="file"
          />
          <button
            onClick={handleSend}
            className="mt-5 flex btn d-block bg-lime-600 font-bold text-white rounded-lg btn-lg text-dark fw-bold btn-primary p-3"
          >
            Begin Payments
          </button>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        {tableRows.map((rows, index) => {
                          return (
                            <th
                              key={index}
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              {rows}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {values.map((value: any, index: number) => {
                        return (
                          <tr key={index}>
                            {value.map((val: any, i: number) => {
                              return (
                                <td
                                  key={i}
                                  className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                                >
                                  {val}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <section className="pt-5">
          <div className="text-dark container" style={{ paddingTop: "150px" }}>
            <div className="mb-5 d-flex justify-content-between align-items-center">
              <h1 className="fw-bold text-white ">Upload Excel File</h1>
            </div>
            <section className="pb-5 mb-5">
              <form>
                <div className="form-group my-4">
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                  />

                  {data.length > 0 && (
                    <table className="text-white m-4">
                      <thead>
                        <tr>
                          {Object.keys(data[0]).map((key) => (
                            <th key={key}>{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, index) => (
                          <tr key={index}>
                            {Object.values(row).map((value, index) => (
                              <td key={index}>{value}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </form>
            </section>
          </div>

          <div className="mb-5 d-flex justify-content-between  align-items-center">
            <h1 className="fw-bold text-white ">Total amount is: {amount}</h1>
          </div>
          <div
            // onClick={() => distributeFunds()}
            className="mt-5 btn d-block btn-lg text-dark fw-bold btn-primary p-3"
          >
            Approve and Distribute ✅
          </div>
        </section> */}
      </Layout>
    </>
  );
}
