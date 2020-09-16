import React, {useState} from 'react'

import styled from 'styled-components'
import {uploadPhoto} from '../../functionhelpers'


export const ImageUploader = ({shiftId, dispatch}) =>{
    let initialState = { shiftId: shiftId, pictureType: "", file: null };
    const [state, updateState] = useState(initialState)

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
        <div>
            <label> Upload Mileage Photos: 
                <input style={{color: "white"}}type="file" name="file" id="file" onChange={e=>handleFile(e)}/>
            </label>
           <select onChange={e=> handleSelect(e)}
                defaultValue={{label: "Select Image Type", value: null}}
           >
               <option >Select Image Type</option>
               <option value="startingUrl">Beginning Miles</option>
               <option value="endingUrl">Ending Miles</option>
           </select>
        <button onClick={e=>handleSubmit(e)}>Submit </button>
        </div>


     )


}