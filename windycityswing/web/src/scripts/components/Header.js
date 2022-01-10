import React from "react";

class Header extends React.Component {
  render() {
    return (
      <a id="header" href="/">
        <span id="title">Windy City Swing</span>
        <div id="subtitle">
          THE SWING DANCING INFORMATION IN CHICAGO AND CHICAGOLAND AREA
        </div>
      </a>
    );
  }
}

export default Header;
