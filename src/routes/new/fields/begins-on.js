import React from "react";
import {Field,Label,Input} from "react-semantify";

export default class BeginsOn extends React.Component {
  render() {
    return (
      <Field>
        <Label>Begins On</Label>
        <Input>
          <input type="date" id="start-date" />
        </Input>
      </Field>
    )
  }
}
