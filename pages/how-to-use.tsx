import Image from "next/image";
import { CheckIcon } from "@heroicons/react/24/solid";

import Layout from "@/components/layout";

const steps = [
  {
    id: "01",
    name: "Upload CSV File",
    description:
      "Include destination chains, recipient wallet, token and amount.",
    href: "#",
    status: "complete",
  },
  {
    id: "02",
    name: "View and Approve Transactions",
    description: "View and approve transactions before sending.",
    href: "#",
    status: "complete",
  },
  {
    id: "03",
    name: "View Sent/Recieved Payments",
    description: "Retrieve payments for any wallet address.",
    href: "#",
    // status: "upcoming", complete
    status: "complete",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function HowToUse() {
  return (
    <Layout>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="mt-5 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Welcome to the Xcel - User Guide
          </h2>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-gray-700 mb-6">
          Thank you for choosing our Cross-Chain Crypto Bulk Payments App! This
          guide will walk you through the step-by-step process of using the app
          to efficiently manage and execute bulk cryptocurrency transactions
          across different blockchain networks.
        </p>

        <div className="mt-5 mb-14 lg:border-b lg:border-t lg:border-gray-200">
          <nav className="max-w-7xl sm:px-6 lg:px-8" aria-label="Progress">
            <ol
              role="list"
              className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
            >
              {steps.map((step, stepIdx) => (
                <li
                  key={step.id}
                  className="relative overflow-hidden lg:flex-1"
                >
                  <div
                    className={classNames(
                      stepIdx === 0 ? "rounded-t-md border-b-0" : "",
                      stepIdx === steps.length - 1
                        ? "rounded-b-md border-t-0"
                        : "",
                      "overflow-hidden border border-gray-200 lg:border-0"
                    )}
                  >
                    {step.status === "complete" ? (
                      <a href={step.href} className="group">
                        <span
                          className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                          aria-hidden="true"
                        />
                        <span
                          className={classNames(
                            stepIdx !== 0 ? "lg:pl-9" : "",
                            "flex items-start px-6 py-5 text-sm font-medium"
                          )}
                        >
                          <span className="flex-shrink-0">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-600">
                              <CheckIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </span>
                          <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                            <span className="text-sm font-medium">
                              {step.name}
                            </span>
                            <span className="text-sm font-medium text-gray-500">
                              {step.description}
                            </span>
                          </span>
                        </span>
                      </a>
                    ) : step.status === "current" ? (
                      <a href={step.href} aria-current="step">
                        <span
                          className="absolute left-0 top-0 h-full w-1 bg-indigo-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                          aria-hidden="true"
                        />
                        <span
                          className={classNames(
                            stepIdx !== 0 ? "lg:pl-9" : "",
                            "flex items-start px-6 py-5 text-sm font-medium"
                          )}
                        >
                          <span className="flex-shrink-0">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600">
                              <span className="text-indigo-600">{step.id}</span>
                            </span>
                          </span>
                          <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                            <span className="text-sm font-medium text-indigo-600">
                              {step.name}
                            </span>
                            <span className="text-sm font-medium text-gray-500">
                              {step.description}
                            </span>
                          </span>
                        </span>
                      </a>
                    ) : (
                      <a href={step.href} className="group">
                        <span
                          className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                          aria-hidden="true"
                        />
                        <span
                          className={classNames(
                            stepIdx !== 0 ? "lg:pl-9" : "",
                            "flex items-start px-6 py-5 text-sm font-medium"
                          )}
                        >
                          <span className="flex-shrink-0">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                              <span className="text-gray-500">{step.id}</span>
                            </span>
                          </span>
                          <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                            <span className="text-sm font-medium text-gray-500">
                              {step.name}
                            </span>
                            <span className="text-sm font-medium text-gray-500">
                              {step.description}
                            </span>
                          </span>
                        </span>
                      </a>
                    )}

                    {stepIdx !== 0 ? (
                      <>
                        {/* Separator */}
                        <div
                          className="absolute inset-0 left-0 top-0 hidden w-3 lg:block"
                          aria-hidden="true"
                        >
                          <svg
                            className="h-full w-full text-gray-300"
                            viewBox="0 0 12 82"
                            fill="none"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M0.5 0V31L10.5 41L0.5 51V82"
                              stroke="currentcolor"
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        </div>
                      </>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <h2 className="text-xl font-semibold mb-2">Table of Contents:</h2>
        <ol className="list-decimal list-inside ml-4 mb-6">
          <li>Uploading CSV File</li>
          <li>Previewing Transaction Details</li>
          <li>Executing Bulk Transactions</li>
          <li>Viewing Transaction History</li>
        </ol>

        {/* Uploading CSV File */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">1. Uploading CSV File:</h2>
          <p>
            To begin, follow these steps to upload your CSV file containing the
            transaction details:
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li>Connect your metamask or preferred wallet.</li>
            <li>Navigate to the &quot;Send Payments&quot; section.</li>
            <li>Click on the &quot;Upload CSV&quot; button.</li>
            <li>
              Choose the CSV file from your device that contains the transaction
              details.
            </li>
            <li>
              The CSV should have columns for destination chains, recipient
              wallet addresses, token type, and the amount.
            </li>
          </ol>
        </div>

        {/* Previewing Transaction Details */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            2. Previewing Transaction Details:
          </h2>
          <p>
            Before executing the transactions, you can review and confirm the
            details of the bulk payments:
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li>
              After uploading the CSV, the app will display a preview of the
              transaction details.
            </li>
            <li>
              Review the listed destination chains, recipient wallet addresses,
              token types, and amounts.
            </li>
            <li>
              If needed, you can make any last-minute changes directly in the
              preview table.
            </li>
          </ol>
        </div>

        {/* Executing Bulk Transactions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            3. Executing Bulk Transactions:
          </h2>
          <p>
            Once you are satisfied with the transaction details, it&apos;s time
            to execute the bulk transactions:
          </p>
          <ol className="list-decimal list-inside ml-4">
            <li>
              Click the &quot;Proceed&quot; or &quot;Execute Transactions&quot;
              button.
            </li>
            <li>
              The app will prompt you to review the summary of the transactions.
            </li>
            <li>
              Confirm the total amount and the number of transactions to be
              executed.
            </li>
            <li>
              Depending on the blockchain networks involved, the transactions
              may take some time to process. Please be patient.
            </li>
          </ol>
        </div>

        {/* Viewing Transaction History */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            4. Viewing Transaction History:
          </h2>
          <p>You can keep track of your transaction history within the app:</p>
          <ol className="list-decimal list-inside ml-4">
            <li>Navigate to the &quot;View Payments&quot; section.</li>
            <li>
              Here, you&apos;ll find a list of all the transactions you have
              executed.
            </li>
            <li>
              You can filter transactions based on recipient wallet addresses or
              date ranges.
            </li>
            <li>
              Each transaction entry will display details such as the
              destination chain, recipient wallet, token type, amount, and
              status (sent or received).
            </li>
          </ol>
        </div>

        <div className="text-gray-700 mb-6">
          Tips for a Smooth Experience:
          <ul className="list-disc list-inside ml-4">
            <li>
              Ensure your CSV file is properly formatted with accurate recipient
              wallet addresses, token types, and amounts.
            </li>
            <li>
              Double-check the transaction details in the preview stage to avoid
              errors.
            </li>
            <li>
              Be patient while executing transactions, especially if multiple
              blockchain networks are involved.
            </li>
            <li>
              Regularly review your transaction history to keep track of your
              payments.
            </li>
          </ul>
        </div>

        <p>
          Thank you for using our Cross-Chain Crypto Bulk Payments App! If you
          have any further questions or encounter any issues, please refer to
          the app&apos;s Help section or contact our support team for
          assistance. Happy bulk transacting!
        </p>
      </div>
    </Layout>
  );
}
