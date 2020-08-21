import React, {useContext} from 'react';
import logo from './logo.svg';
import './App.css';

import {Display} from './display'


function  App() {
  
//  const data =  useContext(ShiftContext)
  // add in the user call here in context, now you have the user Id and can pull from context
  // do i put the shifts in here too?  and maybe some theming?
  // let values = data.map(shift =>(
  //   <div>{shift.startDateTime}</div>
  // ))
  // console.log(data)
  // let values = data.map(shiftObj => (<div>{shiftObj.startDateTime}</div>))
  

  return (
    // {values}
  //  null
  <Display/>
  );
}

export default App;
