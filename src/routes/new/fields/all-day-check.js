import React from "react";
import {Field,Label,Checkbox} from "react-semantify";

export default class AllDayCheck extends React.Component {

  componentDidMount() {
    $(".toggle").checkbox();
  }

  render() {
    return (
      <Field>
        <Label>All Day?</Label><br/>
        <Checkbox className="toggle">
          <input type="checkbox" id="all-day"/>
        </Checkbox>
      </Field>
    )
  }
}
