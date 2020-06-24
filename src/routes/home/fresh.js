import { h, Component } from "preact";
import {
  TextField,
  Container,
  Paper,
  Button,
  Divider,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import DeleteIcon from "@material-ui/icons/Delete";

export default class Fresh extends Component {
  state = {
    name: null,
    price: null,
    bills: [],
    status: "closed",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name && this.state.price) {
      this.setState({
        bills: [
          ...this.state.bills,
          {
            id: this.state.bills.length + 1,
            name: this.state.name,
            price: this.state.price,
          },
        ],
        name: null,
        price: null,
        status: "success",
      });
      console.log(this.state.status);
      setTimeout(() => {
        this.setState({ status: "closed" });
        console.log(this.state.status);
      }, 5000);
    } else {
      this.setState({ status: "error" });
      console.log(this.state.status);
    }
  };

  render({}, { name, price, bills, status }) {
    return (
      <div>
        <Container>
          <h1>Add customer bill form</h1>
          {status === "error" ? (
            <Alert severity="error">Please fill in all inputs</Alert>
          ) : status === "success" ? (
            <Alert severity="success">
              Done! A bill has been made for this company
            </Alert>
          ) : (
            ""
          )}
          <br />
          <br />
          <TextField
            onInput={this.handleChange}
            name="name"
            required
            label="Company"
            variant="outlined"
            fullWidth
            value={name}
          />
          <br />
          <br />
          <TextField
            onInput={this.handleChange}
            name="price"
            required
            label="Paid"
            variant="outlined"
            value={price}
            fullWidth
          />
          <br />
          <br />
          <Paper elevation={2} style={{ padding: 10 }}>
            <h4>Customer bill: #{bills.length + 1}</h4>
            <Divider />
            <p>Company: {name}</p>
            <p>Paid: {price} $</p>
          </Paper>
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={this.handleSubmit}
            fullWidth
          >
            Submit
          </Button>
          <br />
          <br />
          {bills.length > 0 ? (
            bills.map((item) => {
              return (
                <Paper elevation={2} style={{ padding: 10, marginBottom: 10 }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h4>Customer bill: #{item.id}</h4>
                    <IconButton
                      onClick={() => {
                        let copyState = [...bills];
                        copyState = copyState.filter((bill) => {
                          return bill.id !== item.id;
                        });
                        this.setState({ bills: copyState });
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                  <Divider />
                  <p>Company: {item.name}</p>
                  <p>Paid: {item.price} $</p>
                </Paper>
              );
            })
          ) : (
            <p style={{ textAlign: "center" }}>No bills added...</p>
          )}
        </Container>
      </div>
    );
  }
}
