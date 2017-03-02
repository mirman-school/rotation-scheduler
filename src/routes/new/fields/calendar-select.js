import React from "react";
import {Field,Label} from "react-semantify";

export default class CalendarSelect extends React.Component {

  componentDidMount() {
    $(".ui .dropdown")
    .dropdown();
  }

  render() {
    return (
      <Field>
        <Label>Select Calendar</Label>
        <select id="calendar-select" className="ui search dropdown" onChange={this.props.handler.bind(this)}>
          <option value="">Select Calendar</option>
          {this.context.calendarList.map( c => {
            return (
              <option key={c.id} value={c.id}>{c.summary}</option>
            );
          })}
        </select>
      </Field>
    )
  }
}

CalendarSelect.contextTypes = {
  calendarList: React.PropTypes.array
}
