import Image from "next/image";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Layout from "@/components/layout";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const collections = [
  {
    nftAddress: 1,
    pfp: "/mutant-ape.png",
    name: "",
    verified_on: "",
    editionSize: "100",
    funds_locked: "10 ETH",
    milestones: "1",
    date: "Dec 23, 2023",
    positiveVotes: 9,
  },
  {
    nftAddress: 2,
    pfp: "",
    name: "",
    verified_on: "",
    editionSize: "100",
    funds_locked: "10 ETH",
    milestones: "1",
    date: "Dec 23, 2023",
    positiveVotes: 35,
  },
  {
    nftAddress: 3,
    pfp: "",
    name: "",
    verified_on: "",
    editionSize: "100",
    funds_locked: "10 ETH",
    milestones: "1",
    date: "Dec 23, 2023",
    positiveVotes: 64,
  },
];

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
  },
  // More people...
];

export default function ProjectAttestations() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  enum CredentialType {
    Orb = "orb",
    Phone = "phone",
  }

  const handleWorldCoinSuccess = (data: any) => {
    console.log("WorldCoin Success:", data);
  };

  const handleVerify = (data: any) => {
    console.log("WorldCoin Verify:", data);
  };

  return (
    <Layout>
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            View Sent and Reviewed Payments
          </h2>
        </div>
      </div>

      <div className="relative mt-8 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-6 w-6 text-zinc-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          name="account-number"
          id="account-number"
          className="block w-full rounded-xl border-0 py-3.5 pl-12 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm font-semibold sm:leading-6"
          placeholder="Search for 0xb34r"
        />
      </div>

      <div className="mt-5 lg:mt-8 xl:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-y-0 lg:gap-x-8">
          <div>
            <div className="font-black text-xl text-zinc-900">
              Payments Sent
            </div>
            <div className="mt-3 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Title
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {people.map((person) => (
                          <tr key={person.name}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {person.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {person.title}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="font-black text-xl text-zinc-900">
              Payments Received
            </div>
            <div className="mt-3 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                          >
                            Title
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {people.map((person) => (
                          <tr key={person.name}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {person.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {person.title}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
