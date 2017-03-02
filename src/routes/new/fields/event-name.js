import React from "react";
import {Field,Label,Input} from "react-semantify";

export default class EventName extends React.Component {
  render() {
    return (
      <Field>
        <Label>Event Name</Label>
        <Input>
          <input id="event-name" type="text" placeholder="Untitled Event" />
        </Input>
      </Field>
    )
  }
}
