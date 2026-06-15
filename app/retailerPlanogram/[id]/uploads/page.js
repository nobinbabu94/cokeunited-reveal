"use client";

import RoleGuard from "@/app/components/RoleGuard";
import AppLayout from "@/components/layout/AppLayout";
import { useState } from "react";

export default function UploadsPage() {
  const [activeTab, setActiveTab] = useState("master");

  const [masterProductModal, setMasterProductModal] = useState(false);
  const [storeModal, setStoreModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);

  const requestData = {
    master: [
      {
        id: "MP-001",
        fileName: "Master_Product_Jan.xlsx",
        uploadedBy: "John Smith",
        status: "Completed",
        date: "2025-01-12",
      },
      {
        id: "MP-002",
        fileName: "Master_Product_Feb.xlsx",
        uploadedBy: "Sarah Lee",
        status: "Processing",
        date: "2025-01-18",
      },
    ],
    store: [
      {
        id: "ST-001",
        fileName: "Store_List.xlsx",
        uploadedBy: "David Brown",
        status: "Completed",
        date: "2025-01-15",
      },
    ],
    status: [
      {
        id: "TS-001",
        fileName: "Status_Table.xlsx",
        uploadedBy: "Mike Wilson",
        status: "Completed",
        date: "2025-01-20",
      },
    ],
  };

  return (
     <RoleGuard
      allowedRoles={[
        "admin",
        "retailer",
      ]}
    >
    <AppLayout>
    <div className=" space-y-6">
      {/* Page Header */}
      <div>
        {/* <h1 className="text-2xl font-semibold text-gray-900">
          Project Uploads
        </h1> */}
        {/* <p className="text-gray-500 mt-1">
          Upload retailer project files and review upload requests.
        </p> */}
      </div>

      {/* Upload Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Master Product */}
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-3">
           Upload Weekly Sales Data
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Upload retailer weekly sales data in Excel format.
          </p>

          <button
            onClick={() => setMasterProductModal(true)}
            className="w-full bg-gray-500 text-white py-2.5 rounded-md font-medium hover:bg-gray-700 transition cursor-pointer"
          >
            Upload
          </button>
        </div>

        {/* Store File */}
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-3">
           Upload Master Product Data
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Upload retailer master product data in Excel format.
          </p>

          <button
            onClick={() => setStoreModal(true)}
            className="w-full bg-gray-500 text-white py-2.5 rounded-md font-medium hover:bg-gray-700 transition cursor-pointer"
          >
            Upload
          </button>
        </div>

        {/* Status Table */}
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-3">
            Upload Store data
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Upload retailer store data in Excel format.
          </p>

          <button
            onClick={() => setStatusModal(true)} 
            className="w-full bg-gray-500 text-white py-2.5 rounded-md font-medium hover:bg-gray-700 transition cursor-pointer"
          >
            Upload
          </button>
        </div>
      </div>

      {/* Project Requests */}
      <div className="bg-white border rounded-lg shadow-sm">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold">
            Project Requests
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 px-6 pt-4">
          <button
            onClick={() => setActiveTab("master")}
            className={`cursor-pointer px-4 py-2 rounded-md font-medium transition ${
              activeTab === "master"
                ? "bg-[#F40009] text-white"
                : "bg-gray-100 text-gray-700"
            } `}
          >
           Weekly Sales Data
          </button>

          <button
            onClick={() => setActiveTab("store")}
            className={`cursor-pointer px-4 py-2 rounded-md font-medium transition ${
              activeTab === "store"
                ? "bg-[#F40009] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Master Product Data
          </button>

          <button
            onClick={() => setActiveTab("status")}
            className={`cursor-pointer px-4 py-2 rounded-md font-medium transition ${
              activeTab === "status"
                ? "bg-[#F40009] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Store data
          </button>
        </div>

        {/* Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3 font-semibold">
                  Request ID
                </th>
                <th className="text-left p-3 font-semibold">
                  File Name
                </th>
                <th className="text-left p-3 font-semibold">
                  Uploaded By
                </th>
                <th className="text-left p-3 font-semibold">
                  Status
                </th>
                <th className="text-left p-3 font-semibold">
                  Uploaded Date
                </th>
              </tr>
            </thead>

            <tbody>
              {requestData[activeTab].map((row) => (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{row.id}</td>

                  <td className="p-3">{row.fileName}</td>

                  <td className="p-3">{row.uploadedBy}</td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="p-3">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Placeholder Modals */}

      {masterProductModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[450px]">
            <h3 className="text-lg font-semibold mb-4">
             Upload Weekly Sales Data
            </h3>

            <p className="text-gray-500">
              Upload modal goes here...
            </p>

            <button
              onClick={() => setMasterProductModal(false)}
              className="mt-4 px-4 py-2 bg-[#F40009] text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {storeModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[450px]">
            <h3 className="text-lg font-semibold mb-4">
              Upload Master Product Data
            </h3>

            <p className="text-gray-500">
              Upload modal goes here...
            </p>

            <button
              onClick={() => setStoreModal(false)}
              className="mt-4 px-4 py-2 bg-[#F40009] text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {statusModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[450px]">
            <h3 className="text-lg font-semibold mb-4">
             Upload Store data
            </h3>

            <p className="text-gray-500">
              Upload modal goes here...
            </p>

            <button
              onClick={() => setStatusModal(false)}
              className="mt-4 px-4 py-2 bg-[#F40009] text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </AppLayout>
    </RoleGuard>
  );
}