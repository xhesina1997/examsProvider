import React, { Component } from "react";
import Dropzone from "react-dropzone";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ChipInput from "material-ui-chip-input";
import PropTypes from "prop-types";
import Navbar from "../Navbar/navbar";
import { Subject } from "rxjs";
import Button from "@material-ui/core/Button";
const firebase = require("firebase");
const subject = new Subject();
const closeSubscription = new Subject();
class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("submissions");
    this.state = {
      uploadedFileCloudinaryUrl: "",
      uploadedFile: [],
      uploaded: false,
      chips: []
    };
    this.onImageDrop = this.onImageDrop.bind(this);
  }
  setFiles = files => {
    this.setState({
      uploadedFile: files
    });
  };
  onImageDrop() {
    this.handleImageUpload(this.state.uploadedFile);
    this.setState({
      uploadedFile: []
    });
    subject.subscribe(res => {
      console.log(res);
      this.ref.add({
        files: res
      });
    });
  };
  onBeforeAdd(chip) {
    return chip.length >= 3;
  }
  handleAdd(chip) {
    this.setState({
      chips: [...this.state.chips, chip]
    });
  }

  handleDelete(deletedChip) {
    if (deletedChip !== "react") {
      this.setState({
        chips: this.state.chips.filter(c => c !== deletedChip)
      });
    } else {
      alert("Why would you delete React?");
    }
  }
  handleImageUpload(imageFiles) {
    var fileDownloadLinks = [];
    var storageRef = firebase.storage().ref();
    imageFiles.map(imageFile => {
      var uploadTask = storageRef
        .child("images/" + imageFile.name)
        .put(imageFile);
      uploadTask.on(
        "state_changed",
        function(snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function(error) {},
        function() {
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            fileDownloadLinks.push(downloadURL);
            console.log(fileDownloadLinks.length , imageFiles.length);
            
            if (fileDownloadLinks.length == imageFiles.length) {
              subject.next(fileDownloadLinks);
            }
          });
        }
      );
    });
  }
  render() {
    return (
      <div>
        <Navbar />
        <div
          style={{
            marginLeft: "37%",
            marginTop: "2%"
          }}
        >
          <Dropzone
            onDrop={this.setFiles}
            minSize={0}
            maxSize={5242880}
            multiple
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                style={{
                  width: "500px",
                  height: "300px",
                  backgroundColor: "#efefefa6"
                }}
              >
                <input {...getInputProps()} />
                <div
                  style={{
                    marginLeft: "30%",
                    paddingTop: "25%"
                  }}
                >
                  {isDragActive
                    ? "Drop it like it's hot!"
                    : "Click me or drag a file to upload!"}
                  <br></br>
                  <CloudDownloadIcon style={{ marginLeft: "25%" }} />
                </div>
              </div>
            )}
          </Dropzone>
          <div>
            {this.state.uploadedFile.length <= 0 ? null : (
              <div>
                {this.state.uploadedFile.map(file => (
                  <p>{file.name}</p>
                ))}
              </div>
            )}
          </div>
          <div
            style={{
              marginTop: "2%"
            }}
          >
            <TextareaAutosize
              ref="_ref"
              aria-label="minimum height"
              style={{ width: "493px" }}
              rows={10}
              placeholder="Description"
            />
          </div>

          <div>
            <ChipInput
              style={{ width: "500px", marginTop: "2%" }}
              {...this.props}
              value={this.state.chips}
              color="primary"
              onBeforeAdd={chip => this.onBeforeAdd(chip)}
              onAdd={chip => this.handleAdd(chip)}
              onDelete={deletedChip => this.handleDelete(deletedChip)}
              onBlur={event => {
                if (this.props.addOnBlur && event.target.value) {
                  this.handleAdd(event.target.value);
                }
              }}
              fullWidth
              label="Some chips with at least three characters"
            />
          </div>
          <div style={{ marginTop: "40px" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={this.onImageDrop}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
  componentWillUnmount() {
    // unsubscribe to ensure no memory leaks
    this.subject.unsubscribe();
  }
}
FileUploader.propTypes = {
  addOnBlur: PropTypes.bool
};
export default FileUploader;
