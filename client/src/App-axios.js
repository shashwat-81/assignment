import React,{useEffect}from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios'
function App() {
  
    const [phonebook,setPhonebook]=useState([])
    useEffect(()=>{
      Axios.get('http://localhost:8080/get-phone').then(res=>{
        setPhonebook(res.data.data.phoneNumbers)
      })
    },[])
    const [name,setName]=useState('')
    const [phone,setPhone]=useState(0)
    const addNewNumber=()=>{
     // Axios.post('http://localhost:8080/add-phone',{name,phone})//code with axios to post the data to backend
        axios.post('http://localhost:8080/add-phone',{name,phone}
       ).then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log(error);
      })
    }
    return (
      <div>
        <h1>PhoneBook</h1><hr/>
        {
        phonebook.map((val,key)=>{
          return <div key={key} className="phone">
            <p>Name :{val.name}</p>
            <p>Number{val.phone}
            </p>
            </div>})}
    <label htmlFor="">Name: </label>
    <input type="text" onchange={(e)=>{setName(e.target.value)}}/><br/><br/>
    <label htmlFor="">Phone: </label>
    <input type="number" onchange={(e)=>{setPhone(e.target.value)}}/><br/><br/>
    <button onClick={addNewNumber}>Add New Number</button>
    </div>
  );
}

export default App;