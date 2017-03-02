import React from "react";
import {Field,Label,Button,Icon,List,Item} from "react-semantify";

class Invitee extends React.Component {
  render() {
    return (
      <Item className="invitee">
        <span>{this.props.email}</span>
        <Button className="compact circular inverted red" onClick={()=>{this.props.remove(this.props.email)}}>
          <Icon className="remove"></Icon>
        </Button>
      </Item>
    )
  }
}

export default class Invitees extends React.Component {

  render() {
    return (
      <Field>
        <Label>Invitees</Label>
        <List>
          {this.props.invitees.map( i => {
            return (
              <Invitee email={i} key={i} remove={this.props.remove.bind(this)}/>
            )
          })}
        </List>
        <input id="new-invitee" type="text" />
        <Button className="inverted blue" onClick={this.props.add.bind(this)}>
          <Icon className="add"></Icon>
          Add
        </Button>
      </Field>
    );
  }
}
