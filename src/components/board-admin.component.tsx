import { Component } from "react";

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
};

type Props = {};

type State = {
  content: InventoryItem[];
}

export default class BoardAdmin extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      response => {
        this.setState({
          content: Array.isArray(response.data) ? response.data : []
        });
      },
      error => {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access.")
          EventBus.dispatch("logout");
          window.location.href = "/login";
        } else {
          this.setState({
            content:
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString()
          });
        }
      }
    );
  }

  render() {
    return (
      // <div className="container">
      //   <header className="jumbotron">
      //     <h3>{this.state.content}</h3>
      //   </header>
      // </div>

      <div>
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
              {
                this.state.content && this.state.content.map(
                  (item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.productName}</td>
                      <td>{item.description}</td>
                      <td>{item.quantity}</td>
                      <td>{item.priceOfAcquisition}</td>
                      <td>{item.dateAdded}</td>
                      <td>{item.dateUpdated}</td>
                    </tr>
                  )

                )
              }
            </tbody>


          </table>


        </div>
      </div>
    );
  }
}