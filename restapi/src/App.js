import React from "react";
import "./App.css";
// import Contact from "./Components/contact";
import Mymodal from "./Components/mymodal";
import { Button } from "react-bootstrap";
import ViewContact from "./Components/ViewContact";
const axios = require("axios");

class App extends React.Component {
  state = {
    contacts: [],
    isShowed: false,
    wannaAdd: false
  };

  // handleContacts = (a, b, c) => {
  //   this.setState({
  //     contacts: [...this.state.contacts, { name: a, adress: b, number: c }]
  //   });
  // };

  grabbingContacts = () => {
    axios
      .get("http://localhost:3001/find_contacts")
      .then(res => {
        this.setState({ contacts: [...res.data] });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteHandler = id => {
    axios.delete(`http://localhost:3001/delete_contact/${id}`).then(res => {
      this.grabbingContacts();
    });
  };

  componentDidMount() {
    this.grabbingContacts();
  }
  render() {
    return (
      <div className="App">
        <Mymodal grabbingContacts={this.grabbingContacts} />
        <Button
          onClick={() => this.setState({ isShowed: !this.state.isShowed })}
        >
          List contacts
        </Button>
        {this.state.isShowed
          ? this.state.contacts.map((contact, i) => {
              return (
                <ViewContact
                  key={i}
                  contact={contact}
                  grabbingContacts={this.grabbingContacts}
                />
              );
            })
          : null}
      </div>
    );
  }
}

export default App;
