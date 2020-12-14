import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from '@material-ui/core/Link';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <div>
        <AppBar position="static" title="Xhesina's App">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              <LocationCityIcon /> Xhesina's App
              <Breadcrumbs aria-label="breadcrumb">
                
              </Breadcrumbs>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
