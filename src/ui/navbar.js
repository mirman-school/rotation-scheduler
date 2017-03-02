import React from "react";
import {Menu, Item, Icon} from 'react-semantify';
import {Link} from "react-router";
import GoogleLogin from "react-google-login";
import config from "../config";

const siteConfig = config().site;

class NavItem extends React.Component {
  render() {
    return (
      <Item>
        <Link to={this.props.href}>
          <Icon className={this.props.icon} />
          <span> {this.props.text}</span>
        </Link>
      </Item>
    )
  }
}

export default class Navbar extends React.Component {

  render() {
    const googleConfig = config().googleApi;
    return(
      <Menu className="inverted stackable four">
        <Item>
          <h1>{siteConfig.name}</h1>
        </Item>
        <NavItem icon="add" text="New Event" href="/new" />
        <Menu className="inverted right">
          <Item>
            <GoogleLogin
              clientId={googleConfig.clientId}
              buttonText="Login" onSuccess={this.props.login.bind(this)}
              onFailure={() => {alert("Login failed")}} scope={"profile email https://www.googleapis.com/auth/calendar"}
            />
          </Item>
        </Menu>
      </Menu>
    )
  }
}
