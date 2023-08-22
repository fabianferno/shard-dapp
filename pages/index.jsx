import Layout from "@/components/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import * as XLSX from "xlsx";
import { ERC20Sender, ERC20 } from "../utils";
import Papa from "papaparse";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function App() {
  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
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

  return (
    <>
      <Head>
        <title>EMISSARY</title>
        <meta name="title" content="EMISSARY" />
        <meta name="description" content="EMISSARY" />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://emissary.vercel.app/meta-image.jpg"
        />
        <meta property="og:title" content="EMISSARY" />
        <meta property="og:description" content="EMISSARY" />
        <meta
          property="og:image"
          content="https://emissary.vercel.app/meta-image.jpg"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://emissary.vercel.app/" />
        <meta property="twitter:title" content="EMISSARY" />
        <meta property="twitter:description" content="EMISSARY" />
        <meta
          property="twitter:image"
          content="https://emissary.vercel.app/meta-image.jpg"
        />
      </Head>

      <Layout>
        {/* CSV file upload + Display Component to be here */}
        <div className="md:flex md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Make bulk payments across multiple chains! - Powered by Axelar
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
            Large file input
          </label>
          <input
            name="file"
            accept=".csv"
            onChange={changeHandler}
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            type="file"
          />

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
                      {values.map((value, index) => {
                        return (
                          <tr key={index}>
                            {value.map((val, i) => {
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
