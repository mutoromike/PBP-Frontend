import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "react-google-charts";
import { ToastContainer, toast } from "react-toastify";
import { url, headers } from "../../constants/Utils";

const Dashboard = () => {
  const [incoming, setIncoming] = useState(0);
  const [outgoing, setOutgoing] = useState(0);
  const [user, setUser] = useState("");
  const [business, setBusiness] = useState("");
  const [value, setValue] = useState([]);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    function getAnalytics() {
      const header = { ...headers };
      axios({
        method: "get",
        url: url["base-url"] + "/api/v1/data-upload/",
        headers: header.headers,
      })
        .then((resp) => {
          console.log(resp);
          setOutgoing(resp.data.outgoing || 0);
          setIncoming(resp.data.incoming || 0);
          setUser(resp.data.user || "");
          setBusiness(resp.data.business || "");
          setQuantity(
            Object.entries(resp.data.leading_quantity).sort(function (a, b) {
              return a[1] - b[1];
            }) || []
          );
          setValue(
            Object.entries(resp.data.leading_value).sort(function (a, b) {
              return a[1] - b[1];
            }) || []
          );
        })
        .catch((err) => {
          toast.error("You have no analytics yet!");
        });
    }

    getAnalytics();
  }, []);
  function getLargest(val) {
    const c = val[4];
    let d = "None";
    if (c) {
      d = c[0];
    }
    return d;
  }
  function getData(data) {
    let val = [["None", 0]];
    if (data==[]) {
      val = data
    }
    console.log(val)
    return val;
  }
  return (
    <div className="container page-content" style={{ marginTop: 100 }}>
      <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={3000}
      />
      {/* {getBusiness()} */}
      <div className="col-md-12">
        <table className="table" style={{ border: "none" }}>
          <tbody>
            <tr className="row">
              <td style={{ width: "50%" }}>
                <h5>Business: {business}</h5>
                <h5>User: {user}</h5>
                <div>
                  <Chart
                    width={"500px"}
                    height={"300px"}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ["Type", "Value"],
                      ["Incoming", incoming],
                      ["Outgoing", outgoing],
                    ]}
                    options={{
                      title: "Incoming vs Outgoing Cash",
                      // Just add this option
                      is3D: true,
                    }}
                    rootProps={{ "data-testid": "2" }}
                  />
                </div>
              </td>
              <td>
                <h5>Top Product: {getLargest(value)}</h5>
                <h5>Incoming Amount: $ {incoming}</h5>
                <h5>Outgoing Amount: $ {outgoing}</h5>
              </td>
            </tr>
            <tr className="row">
              <td style={{ width: "50%" }}>
                <div>
                  <Chart
                    width={"600px"}
                    height={"400px"}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[["", "Value Range"], ...getData(value)]}
                    options={{
                      title: "Top 5 items interms of Value",
                      chartArea: { width: "50%" },
                      hAxis: {
                        title: "Items",
                        minValue: 0,
                      },
                      vAxis: {
                        title: "Value in $",
                      },
                    }}
                    // For tests
                    rootProps={{ "data-testid": "1" }}
                  />
                </div>
              </td>
              <td>
                <div>
                  <Chart
                    width={"600px"}
                    height={"400px"}
                    chartType="ColumnChart"
                    loader={<div>Loading Chart</div>}
                    data={[["", "Quantity Range"], ...getData(quantity)]}
                    options={{
                      title: "Top 5 items interms of quantity",
                      chartArea: { width: "50%" },
                      hAxis: {
                        title: "Items",
                        minValue: 0,
                      },
                      vAxis: {
                        title: "Quantity",
                      },
                    }}
                    // For tests
                    rootProps={{ "data-testid": "1" }}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
