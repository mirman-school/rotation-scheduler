import React from "react";
import {Modal,Button} from "react-semantify";

export default class SuccessPopup extends React.Component {

  componentDidMount() {
    $(".ui.modal").modal();
  }

  render() {
    return (
      <Modal id="success-popup">
        <h3>Event Created</h3>
        <p>
          Go to <a href="https://calendar.google.com">Google Calendar</a> to view your events.
        </p>
        <Button className="inverted blue" onClick={()=>{$("#success-popup").modal("hide");}}>
          Okay
        </Button>
      </Modal>
    )
  }
}
