import React from "react";
import "./App.css";
import SearchIcon from "@material-ui/icons/Search";
import CollenctionsIcon from "@material-ui/icons/Collections";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Navbar from "./Navbar/navbar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {withRouter} from 'react-router-dom';

const firebase = require("firebase");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subcategories: [],
      showSubcategories: false
    };
  }
  goToAddFiles(path){
    this.props.history.push(path);
  }
  handleClick(category) {
    if (category.subcategories != null && category.subcategories.length != 0) {
      this.setState({ subcategories: category.subcategories });
      this.setState({ showSubcategories: true });
    } else {
      this.setState({ showSubcategories: false });
    }
  }

  render() {
    return (
      <div style={{ width: "100%" }} className="container-wrapper">
        <Navbar />

        <div className="search-container">
          <TextField
            style={{ width: "80%" }}
            id="outlined-search"
            label="Search field"
            type="search"
            margin="normal"
            variant="outlined"
          />
          <Button
            style={{ marginTop: "16px", height: "54px" }}
            variant="contained"
            color="secondary"
            startIcon={<SearchIcon />}
          />
          <Fab
            style={{ marginLeft: "9%", marginTop: "15px" }}
            color="secondary"
            aria-label="add"
            onClick={() => this.goToAddFiles('/upload') }
          >
            <AddIcon />
          </Fab>
        </div>

        <div
          className="search-container "
          style={{ marginTop: "30px", width: "800px" }}
        >
          <div
            style={{
              width: "400px",
              height: "500px",
              borderRight: "1px solid #e8e7e8"
            }}
          >
            <List subheader={<li />}>
              {this.state.categories.map(category => (
                <li key={category.id}>
                  <ul
                    className="onHoverItem"
                    onClick={() => {
                      this.handleClick(category);
                    }}
                  >
                    <ListItem key={category.id}>
                      <FolderOpenIcon /> &nbsp;&nbsp;
                      <ListItemText primary={category.name} />
                    </ListItem>
                  </ul>
                </li>
              ))}
            </List>
          </div>
          {this.state.showSubcategories == true ? (
            <div
              style={{
                width: "350px",
                height: "500px",
              }}
            >
              <List subheader={<li />}>
                {this.state.subcategories.map(subcategory => (
                  <li key={subcategory.id}>
                    <ul className="onHoverItem">
                      <ListItem key={subcategory.id}>
                        <CollenctionsIcon /> &nbsp;&nbsp;
                        <ListItemText primary={subcategory.name} />
                      </ListItem>
                    </ul>
                  </li>
                ))}
              </List>
            </div>
          ) : (
            <div
              style={{
                color: "#ff5555",
                height: "20px",
                marginTop: "27%",
                marginLeft: "25%",
                backgroundColor: "#f7e6e6ba"
              }}
            >
              No subcategories
            </div>
          )}
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("category")
      .onSnapshot(serverUpdate => {
        const categories = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        console.log(categories);
        this.setState({ categories: categories });
      }); //gets automatically called whenever the categories collection is updated inside firebase
  };
}

export default App;
