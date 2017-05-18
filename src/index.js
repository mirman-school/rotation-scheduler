import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, createMemoryHistory } from "react-router";
import NavBar from "./ui/navbar";
import NewEvent from "./routes/new/"
import config from "./config";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated:false,
      userEmail: "",
      rotationEvents: [],
      calendarList: []
    }
  }

  _listUpcomingEvents(component) {
    const googleConfig = config().googleApi
    const rotCalReq = gapi.client.calendar.events.list({calendarId: googleConfig.rotationCalendar});
    const calListReq = gapi.client.calendar.calendarList.list();
    rotCalReq.execute((res) => {
      component.setState({rotationEvents: res.items});
    });
    calListReq.execute( (res) => {
      component.setState({calendarList:res.items})
    });
  }

  _loadCalendarApi(component) {
    gapi.client.load('calendar', 'v3')
    .then( () => {
        this._listUpcomingEvents(component)
    })
  }

  _checkAuth() {
    const googleConfig = config().googleApi;
    gapi.auth2.getAuthInstance(
      {
        'client_id': googleConfig.clientId,
        'scope': googleConfig.scopes
      }
    );
    this._loadCalendarApi(this);
  }

  _googleResponse(res) {
    const siteConfig = config().site;
    const email = res.getBasicProfile().getEmail();
    if(email.match(siteConfig.teacherDomain) || email.match(siteConfig.studentDomain)) {
      console.log("Authenticated");
      this._checkAuth();
      this.setState({authenticated:true, userEmail:email});
    } else {
      alert("Not authenticated!");
    }
  }

  getChildContext() {
    return {
      authenticated: this.state.authenticated,
      userEmail: this.state.userEmail,
      calendarList: this.state.calendarList,
      rotationEvents: this.state.rotationEvents
    };
  }

  render() {
    return (
      <div>
        <NavBar login={this._googleResponse.bind(this)} />
        {this.props.children}
      </div>
    )
  }
}

App.childContextTypes = {
  authenticated: React.PropTypes.bool,
  rotationEvents: React.PropTypes.array,
  calendarList: React.PropTypes.array,
  userEmail: React.PropTypes.string
}

ReactDOM.render(
  <Router history={createMemoryHistory()}>
    <Route path="/" component={App}>
      <Route path="/new" component={NewEvent}>
      </Route>
    </Route>
  </Router>,
  document.getElementById("root")
);
