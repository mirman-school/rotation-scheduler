import React from "react";
import {Form,Fields,Button} from "react-semantify";
import {CalendarSelect,EventName,BeginsOn,EndsOn,StartTime,EndTime,AllDayCheck,RecurSelect,Invitees} from "./fields";
import SuccessPopup from "./success-popup";
import config from "../../config";
import {generateDate,generateDateResource} from "../../lib/dates";
import _ from "lodash";

export default class EventForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      invitees: [],
      selectedCalendar: null
    }
  }

  _selectCalendar(e) {
    this.setState({selectedCalendar: e.target.value.replace("@","%40")});
  }

  _dayMatch(current,recursOn) {
    for (const l in this.context.rotationEvents) {
      const letterDay = this.context.rotationEvents[l];
      const currentDateString = current.toISOString().substr(0,10);
      if(letterDay.start.date === currentDateString) {
        return (_.includes(recursOn,letterDay.summary));
      }
    }
    return false;
  }

  _clearFields() {
    $("input").val("");
    $("select").dropdown("restore defaults");
    this.setState({invitees: []});
  }

  _onSubmit() {
    const data = {
      selectedCalendar: $("#calendar-select").val(),
      created: Date.now(),
      eventName: $("#event-name").val(),
      recursOn: $("#recur-select").val(),
      startDate: $("#start-date").val(),
      endDate: $("#end-date").val(),
      startTime: $("#start-time").val(),
      endTime: $("#end-time").val(),
      allDay: $("#all-day").is(":checked"),
      invitees: this.state.invitees
    }
    const current = generateDate(data,data.startDate,"start");
    const end = generateDate(data,data.endDate,"end");
    if (current.toString() === "Invalid Date" || end.toString() === "Invalid Date") {
      return alert("Invalid date(s)!");
    }
    while(current.isBefore(end)) {
      if(this._dayMatch(current,data.recursOn)) {
        // Make a calendar entry
        const request = gapi.client.calendar.events.insert({
          calendarId: data.selectedCalendar,
          resource: {
            summary: data.eventName,
            start: generateDateResource(data,current,"start"),
            end: generateDateResource(data,current,"end"),
            attendees: _.map(data.invitees,(i) => {return {email:i}})
          }
        });
        request.execute(() => {
          // Do something!
        });
      }
      current.date(current.date() + 1);
    }
    $("#success-popup").modal("show");
    this._clearFields();
  }

  _removeInvitee(email) {
    const newInvitees = this.state.invitees;
    newInvitees.splice(
      this.state.invitees.indexOf(email),1
    );
    this.setState({invitees: newInvitees});
  }

  _addInvitee() {
    const newInvitee = $("#new-invitee").val();
    if(newInvitee === "") {
      return alert("Need an email address!");
    }
    if(!newInvitee.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
      return alert("Need a valid email!");
    }
    this.setState({invitees:this.state.invitees.concat([newInvitee])});
    $("#new-invitee").val("");
  }

  render() {
    const siteConfig = config().site;
    return (
      <Form>
        <Fields className="one">
          <CalendarSelect handler={this._selectCalendar.bind(this)}/>
        </Fields>
        <Fields className="three">
          <EventName />
          <RecurSelect cycleDays={siteConfig.cycleDays} />
          <AllDayCheck />
        </Fields>
        <Fields className="four">
          <BeginsOn />
          <EndsOn />
          <StartTime />
          <EndTime />
        </Fields>
        <Fields className="one">
          <Invitees
            invitees={this.state.invitees}
            add={this._addInvitee.bind(this)}
            remove={this._removeInvitee.bind(this)}/>
        </Fields>
        <Button className="inverted fluid green" onClick={this._onSubmit.bind(this)}>
          Submit
        </Button>
        <SuccessPopup />
      </Form>

    );
  }
}

EventForm.contextTypes = {
  rotationEvents: React.PropTypes.array,
  calendarList: React.PropTypes.array
}
