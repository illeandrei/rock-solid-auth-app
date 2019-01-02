import React, { Component } from "react";
import { connect } from "react-redux";

export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.checkAuthentication();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      this.checkAuthentication();
    }

    checkAuthentication() {
      if (!this.props.authenticated) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return connect(({ auth }) => ({ authenticated: auth.authenticated }))(
    ComposedComponent
  );
};
