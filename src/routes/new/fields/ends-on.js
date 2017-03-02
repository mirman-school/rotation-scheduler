import React from "react";
import {Field,Label,Input} from "react-semantify";

export default class EndsOn extends React.Component {
  render() {
    return (
      <Field>
        <Label>Ends On</Label>
        <Input>
          <input type="date" id="end-date" />
        </Input>
      </Field>
    )
  }
}
