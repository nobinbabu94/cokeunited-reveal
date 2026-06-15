import Loading from "@/components/loading/Loading";
import ResetNavbar from "@/components/NavBars/ResetNavbar";
import SuperSet from "@/components/superset/SuperSet";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import Select from "react-select";

const index = () => {
  const [getTok, setGetTok] = useState("");
  const [embeddedId, setEmbeddedId] = useState("");
  const [resets, setResets] = useState([]);
  const [loading, setLoading] = useState(false)
  const [isAdvanceFilter, setIsAdvanceFilter] = useState(false)
  const [value, setValue] = useState({ value: "", label: "" });

  const params = useParams();

  const { reset, submenu } = params;
  const userRole = useSelector((state) => state.user?.data?.user_role);

  useEffect(() => {
    fetchData();
    fetchResets()
  }, []);

  let resetName =
    submenu === "locationchart"
      ? "locbychannelembid"
      : submenu === "pogcoverage"
        ? userRole === "partner" // If submenu is "pogcoverage", check userRole
          ? "pogcoveragepartnerembid" // If user is a partner
          : "pogcoverageembid"
        : submenu === "contentplacements"
          ? "contentlocpgembid"
          // : submenu === "merchchanges" ? "allmerchprodembid"
          : submenu === "productsplacementsellable"
            ? userRole === "partner" ? 'productsplacementsellablepartnerembid' : "productsplacementsellableembid"
            : submenu === "productsplacementnonsellable"
              ? userRole === "partner" ? 'productsplacementnonsellablepartnerembid' : "productsplacementnonsellableembid"
              // : submenu === "NonSellableProductReport" ? "productsnonsellableembid"
              //   : submenu === "NonSellableProductPlacementReport" ? "productsplacementnonsellableembid"
              //     : submenu === "SellableProductReport" ? "productssellableembid"
              //       : submenu === "SellableProductPlacementReport" ? "productsplacementsellableembid"
              : submenu === "productplacementchanges"
                ? userRole === "partner" ? '' : "productsplacementsellableembid"
                : "filtersembid";



  const fetchData = async () => {
    setEmbeddedId("");
    try {
      // Dynamically constructing API path with reset and submenu
      const response = await fetch(`/api/common/${reset}/${resetName}`, {
        method: "GET", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response?.status === 200) {
        const data = await response.json();

        // assuming the response has the embeddedId field
        setEmbeddedId(data);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error in fetchData:", error);
    }
  };
  const body = {
    resetId: reset,
    resetName: resetName,
    user_role: userRole
  }


  // const fetchEmbeddedReset = async () => {
  //   setLoading(true)



  //   try {
  //     const response = await fetch(`/api/common/embedded-reset`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(body),
  //     });

  //     if (response.ok || response?.status) {
  //       const data = await response.json();
  //       const fetchedResets = data?.response?.body[1] || [];
  //       setResets(fetchedResets);

  //     }
  //     setLoading(false)
  //   } catch (error) {
  //     console.log(error, "error");
  //     setLoading(false)
  //   }
  // };

  const fetchResets = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/common/reset-reporting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

      if (response.ok || response?.status) {
        const data = await response.json();
        const fetchedResets = data?.response?.body[1] || [];
        setResets(fetchedResets);

      }
      setLoading(false)
    } catch (error) {
      console.log(error, "error");
      setLoading(false)
    }
  };


  const resetStatus = reset ? resets?.find((item) => item?.resetid == reset) : null;


  return (
    <>
      <div className="w-full" id="superset-container">
        {embeddedId?.body?.embeddedid &&
          <ResetNavbar
            resetStatus={resetStatus} reset={reset} submenu={submenu} />}
        <div className="mt-16">
          {embeddedId?.body?.embeddedid &&

            <> {embeddedId?.body?.embeddedid ?
              (
                <div className="w-full h-[65vh] ">
                  <SuperSet EMBEDDED_ID={embeddedId?.body?.embeddedid} setGetTok={setGetTok} report={'report'} />
                </div>
              ) : embeddedId?.body?.embeddedid === null || embeddedId?.status === 404 ? (
                <div className="w-full h-screen flex justify-center items-center">
                  <h1 className="text-xl font-attbold text-cobalt-400">Report not found</h1>
                </div>
              ) : (
                <div className="w-full h-[76vh] flex items-center justify-center">
                  <Loading />
                </div>
              )
            }
            </>
          }
        </div>
      </div >
    </>
  )
};

export default index;
