import React, {useState, useRef} from 'react'

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


export const ImageUploader = ({shiftId, dispatch}) =>{
    let initialState = { shiftId: shiftId, pictureType: "", file: null };
    const [state, updateState] = useState(initialState)
    const myRef = useRef()

    const disabled = state.photoUrl ? false: true

     const handleFile = (e) => {
       // const file = e.currentTarget.files[0];
       const file = e.target.files[0];
       console.log(e.target)
       const fileReader = new FileReader();
       fileReader.onloadend = () => {

         updateState(prevState =>
           Object.assign({}, prevState, {
             file: file,
             photoUrl: fileReader.result,
           })
         );
       };
       if (file) {
         fileReader.readAsDataURL(file);
       }
     };

     const handleSubmit = (e) => {
       e.preventDefault();

       const formData = new FormData();
       formData.append("file", state.file, state.file.name);
       formData.append("shiftId", shiftId);
       formData.append("pictureType", state.pictureType);
       // formData.append("profilePrimary", this.state.checked)
       uploadPhoto(formData).then((shift) => dispatch({type: "upload", payload: shift.data}) 
          
         ).then(()=> updateState(initialState))
       
     };



     const handleSelect = (e) =>{
         e.preventDefault()
         e.persist()
         
         updateState(prevState => Object.assign({}, prevState, {pictureType: e.target.value}))
     }

     const handleCancel = e => {
         updateState({ file: null, pictureType: "" });
     }

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
           Upload Mileage Photos:
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
         <select style={{textAlign: "center"}}
           onChange={(e) => handleSelect(e)}
           defaultValue={{ label: "Select Image Type", value: null }}
         >
           <option>Select Image Type</option>
           <option value="startingUrl">Beginning Miles</option>
           <option value="endingUrl">Ending Miles</option>
         </select>
         <UploadButton disabled={disabled} onClick={(e) => handleSubmit(e)}>
           Upload{" "}
         </UploadButton>
       </div>
     );


}