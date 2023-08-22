import Layout from "@/components/layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { ERC20Sender, ERC20 } from "../utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function App() {
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
