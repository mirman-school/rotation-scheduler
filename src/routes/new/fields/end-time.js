import React from "react";
import {Field,Label,Input} from "react-semantify";

export default class EndTime extends React.Component {
  render() {
    return (
      <Field>
        <Label>Event End Time</Label>
        <Input>
          <input type="time" id="end-time" />
        </Input>
      </Field>
    )
  }
}
