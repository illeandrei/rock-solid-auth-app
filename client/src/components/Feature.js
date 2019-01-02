import React, { Component } from "react";
import requireAuth from "./requireAuth";

class Feature extends Component {
  render() {
    return <div>Feature content here!</div>;
  }
}

export default requireAuth(Feature);
