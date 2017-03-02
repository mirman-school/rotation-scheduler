import React from "react";
import {Field,Label,Input} from "react-semantify";

export default class StartTime extends React.Component {
  render() {
    return (
      <Field>
        <Label>Event Start Time</Label>
        <Input>
          <input type="time" id="start-time" />
        </Input>
      </Field>
    )
  }
}
