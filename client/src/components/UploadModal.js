import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { AuthContext } from "./AuthContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
function UploadModal() {
  const {
    categoryName,
    email,
    setEmail,
    upload,
    setUpload,
    imagesUpload, 
    setImagesUpload,
    user
  } = useContext(AuthContext);

  var subtitle;
  // /** start states */
  const [files, setFiles] = useState();
  const [errmessage, setErrmessage] = useState();
  const [toomanyfiles, setToomanyfiles] = useState();
  const [messallow, setMessallow] =  useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  const send = async (event) => {
    event.preventDefault();
    if (files) {
      const formData = new FormData();
      // file is the name of the request parameter
      // file is the state variable  that holds
      // event.target.file[0] from <input type= "file" .../> on line 160
      console.log("number of images", files.length);
      if (files.length < 6) {
        setUpload(false);
        setMessallow(false)
        return setErrmessage("You need to upload exactly 6 images, thanks");
      }
      // if (files.length === 6) {
      for (const file of files) {
        formData.append("image", file);
      }
      formData.append("categoryName", categoryName);
      formData.append("email", email);

      const options = {
        method: "POST",
        body: formData,
      };

      let response = await fetch("/images/save", options);
      
      if (response.status === 400) {
        let error = await response.text();
        setToomanyfiles(error);
        console.log('this is the error', error)
        setMessallow(true)
        setErrmessage(false)
      } else {
        // changes the state to pass it onto Playpage and show the Custom button
        setUpload(true);
        setImagesUpload(true)
        let response1 = await fetch(`/imageupload/update/${user._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imagesUpload: true
          }),
        });
      // this is a post to update the upload image Key
        let data1 = await response1.json();
        let message1 = JSON.stringify(data1);
    
        if (response.status === 200) {
          return message1;
        } else {
          throw Error.message;
        };

      }
      // }else {
      //   // alert('You are allowed to load exactly 6 images, thanks')
      //   setErrmessage('You are allowed to load exactly 6 images, thanks')
      // }
 

    } else {
      setErrmessage("please load the 6 files")
    }
  };

  return (
    <div>
      <div>
        <button type="button" className="btn btn-success" onClick={openModal}>
          Upload your images
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello !!!</h2>

          <h5>Please upload 6 images </h5>

          <form
            action="/images/save"
            method="POST"
            encType="multipart/form-data"
          >
            <div>
              <label htmlFor="categoryName">email:</label>
              <input
                className="form-control"
                id="Email"
                name="Email"
                onChange={(event) => {
                  const { value } = event.target;
                  setEmail(value);
                }}
                value={email}
                placeholder="Type your email"
                required
              ></input>
            </div>

            <div>
              <label htmlFor="image">Upload Image: </label>
              <input
                className="form-control"
                type="file"
                id="image"
                onChange={(event) => {
                  const images = event.target.files;
                  setFiles(images);
                }}
                name="image"
                required
                multiple
              />

              <div>{files ? <p></p> : <i></i>}</div>
            </div>
            <div>
              <button
                onClick={send}
                type="submit"
                className="btn btn-primary w-100"
              >
                Submit
              </button>
              <br />
              {!upload ? (
                <span style={{ color: "red", fontWeight: "700" }}>
                  {errmessage}
                </span>
              ) : (
                <span></span>
              )}
              {messallow ? (
                <span style={{ color: "red", fontWeight: "700" }}>
                  {toomanyfiles}
                </span>
              ) : (
                <span></span>
              )}
              <br />
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-outline-secondary" onClick={closeModal}>
                  close
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>

      <br></br>
    </div>
  );
}

export default UploadModal;
