import React, {useState, useRef} from 'react'
import imageCompression from 'browser-image-compression';
import styled from 'styled-components'
import {uploadPhoto} from '../../functionhelpers'

const UploadButton = styled.button`
  width: 125px;
  height: 25px;
  border-radius: 5px;
  /* background-color: #A3F7B5; */
  background-color: ${(props) => (props.disabled ? "lightgrey" : "#A3F7B5")};
  text-align: center;
  /* line-height: 25px; */
  cursor: ${(props) => (props.disabled ? "" : "pointer")};
  margin: 0px 10px;
  border: none;
  font-size: 12pt;
`;

const StyledLabel = styled.label`
  font-size: 14pt;
  font-weight: bold;
  color: darkslategrey;

`


export const ImageUploader = ({shiftId, dispatch, close, imageType}) =>{
    let initialState = { shiftId: shiftId, pictureType: "", file: null };
    const [state, updateState] = useState(initialState)
    const myRef = useRef()

    const disabled = state.photoUrl ? false: true

     const handleFile = async (e) => {
       // const file = e.currentTarget.files[0];
       const file = e.target.files[0];
       const options = {
         maxSizeMB: 0.5,
         
       }
       console.log(e.target)
       /**
        * Add in compression prior to upload
        * reduce file size and potential storage costs. Set at 0.5MB currently
        * Do I want to add an image preview?  uncomment and fix the filereader
        */
       const compressedFile = await imageCompression(file, options)
      //  const fileReader = new FileReader();

        updateState(prevState =>
           Object.assign({}, prevState, {
             file: compressedFile,
            //  photoUrl: fileReader.result, this is here if you want to add in the image preview before upload
             photoUrl: compressedFile,
           })
         );
     };

     const handleSubmit = (e) => {
       e.preventDefault();

       /**
        * Add time stamp to prevent overwrite on aws upload
        * not appending a value to the file name caused awas to overwrite the existing image
        * apparently iphone file name uploads are always image.jpg?
        */
       const formData = new FormData();
       formData.append("file", state.file,  Date.now() + state.file.name);
       formData.append("shiftId", shiftId);
       formData.append("pictureType", imageType);
       // formData.append("profilePrimary", this.state.checked)
       uploadPhoto(formData).then((shift) => dispatch({type: "upload", payload: shift.data}) 
          
         ).then(()=> {
           updateState(initialState)
            close()
          })
       
     };

    //  const handleCancel = e => {
    //      updateState({ file: null, pictureType: "" });
    //  }

     return (
       <div
         style={{
           margin: "0px auto",
           display: "flex",
           justifyContent: "center",
         }}
       >
         <StyledLabel>
           {" "}
          
           <input
             ref={myRef}
             style={{ color: "white", display: "none" }}
             type="file"
             name="file"
             id="file"
             onChange={(e) => handleFile(e)}
           />
         </StyledLabel>
         <UploadButton onClick={() => myRef.current.click()}>
           Select File
         </UploadButton>
         
         <UploadButton disabled={disabled} onClick={(e) => handleSubmit(e)}>
           Upload{" "}
         </UploadButton>
       </div>
     );


}

//    fileReader.onloadend = () => {

    //      updateState(prevState =>
    //        Object.assign({}, prevState, {
    //          file: file,
    //         //  photoUrl: fileReader.result,
    //          photoUrl: compressedFile,
    //        })
    //      );
    //    };
    //    if (file) {
    //      fileReader.readAsDataURL(file);
    //    }