import React from "react";
import {Field,Label} from "react-semantify";

export default class RecurSelect extends React.Component {
  componentDidMount() {
    $(".ui .dropdown")
    .dropdown();
  }

  render() {
    return (
      <Field>
        <Label>Recurs On</Label>
        <select id="recur-select" className="ui dropdown" multiple=" ">
          <option value="">Select Letter Day</option>
          {this.props.cycleDays.map( d => {
            return (
              <option key={d} value={d}>{d}</option>
            );
          })}
        </select>
      </Field>
    )
  }
}
