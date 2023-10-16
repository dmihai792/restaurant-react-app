import React, { useEffect, useState } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

type InventoryItem = {
  id: number;
  productName: string;
  description: string;
  quantity: number;
  priceOfAcquisition: number;
  dateAdded: string;
  dateUpdated: string;
  //You can say the
  anyNuberOfnotMandatory?: string | number | unknown;
};

const BoardAdmin: React.FC = () => {
  // for instance here, you say that content will have the shape of an array of InventoryItems
  const [content, setContent] = useState<InventoryItem[]>([]);

  useEffect(() => {
    UserService.getAdminBoard()
      .then((response) => {
        setContent(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access.");
          EventBus.dispatch("logout");
          window.location.href = "/login";
        } else {
          // dont put errors on your page :)
          // always console log
          // in production you should have a sctipt that sends console logs to a logging service , not the users console
          console.log(
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString()
          );
        }
      });
  }, []);

  return (
    //this is a react fragment, <></>  you can use it instead of a <div></div> so react dont complain
    <>
      <h2 className="text-center">Inventory Items</h2>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Date Added</th>
              <th>Date Updated</th>
            </tr>
          </thead>
          <tbody>
            {content &&
              content.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.priceOfAcquisition}</td>
                  <td>{item.dateAdded}</td>
                  <td>{item.dateUpdated}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BoardAdmin;
