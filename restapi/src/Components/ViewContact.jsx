import React, { Component } from "react";
import Mymodal from "./mymodal";
import Axios from "axios";

export default class ViewContact extends Component {
  state = {
    wannaEdit: false
  };

  handleDelete = id => {
    Axios.delete(`http://localhost:3001/delete_contact/${id}`).then(res => {
      console.log(res);
      this.props.grabbingContacts();
    });
  };

  render() {
    const { name, adress, number, _id} = this.props.contact;
    return (
      <div>
        <p>{name}</p>
        <p>{adress}</p>
        <p>{number}</p>
        <button
          onClick={() => this.setState({ wannaEdit: !this.state.wannaEdit })}
        >
          Edit
        </button>
        <button onClick={() => this.handleDelete(_id)}>delete</button>
        {this.state.wannaEdit ? (
          <Mymodal
            cardID={_id}
            wannaEdit={this.state.wannaEdit}
            grabbingContacts={this.props.grabbingContacts}
          />
        ) : null}
      </div>
    );
  }
}
