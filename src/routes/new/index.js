import React from "react";
import EventForm from "./event-form";
import {Grid, Column} from "react-semantify";

export default class NewEvent extends React.Component {
  render() {
    if(!this.context.authenticated) {
      return (
        <h2>Must be logged in!</h2>
      );
    }
    return (
      <div className="ui container">
        <Grid>
          <Column className="sixteen wide">
            <h2>New Recurring Event</h2>
            <EventForm />
          </Column>
        </Grid>
      </div>
    )
  }
}

NewEvent.contextTypes = {
  authenticated: React.PropTypes.bool
}
