import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

export default class Mymodal extends Component {
  state = {
    name: "",
    adress: "",
    number: "",
    show: false
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, adress, number } = this.state;
    axios
      .post("http://localhost:3001/add_contact", {
        name: name,
        adress: adress,
        number: number
      })
      .then(res => {
        console.log(res);
        this.props.grabbingContacts();
        this.setState({ name: "", adress: "", number: "" });
      });
  };
  handleEdit = e => {
    e.preventDefault();
    const { name, adress, number } = this.state;
    axios
      .put(`http://localhost:3001/modify_contacts/${this.props.cardID}`, {
        name: name,
        adress: adress,
        number: number
      })
      .then(res => {
        console.log(res);
        this.props.grabbingContacts();
      });
  };
  render() {
    return (
      <div>
        <Button
          variant="primary"
          onClick={() => {
            this.handleShow();
          }}
        >
          Add contact
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              className="d-flex flex-column"
              action=""
              onSubmit={e =>
                this.props.wannaEdit ? this.handleEdit(e) : this.handleSubmit(e)
              }
            >
              <input
                className="w-50"
                name="name"
                type="text"
                onChange={e => this.handleChange(e)}
                value={this.state.name}
              />
              {"Contact name"}
              <input
                className="w-50"
                name="adress"
                type="text"
                onChange={e => this.handleChange(e)}
                value={this.state.adress}
              />
              {"Contact adress"}
              <input
                className="w-50"
                name="number"
                type="text"
                onChange={e => this.handleChange(e)}
                value={this.state.number}
              />
              {"Contact number"}
              <button className="btn btn-danger w-25" type="submit">
                submit
              </button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
