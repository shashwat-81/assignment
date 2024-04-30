import React,{useEffect}from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios'
function App() {
  
    
    const [name,setName]=useState('')
    const [phone,setPhone]=useState(0)
    const [phonebook,setPhonebook]=useState([])
    useEffect(()=>{
      axios.get('http://localhost:8080/get-phone').then(res=>{
        setPhonebook(res.data.data.phoneNumbers)
      })
    },[])
    const addNewNumber=()=>{
     // Axios.post('http://localhost:8080/add-phone',{name,phone})//code with axios to post the data to backend
     axios.post('http://localhost:8080/add-phone',{name,phone}
     ).then(function(response) {
      console.log(response);
    }).catch(function(error) {
      console.log(error);
    })
    
    }
    const updateNumber = (id,name,phoneno) => {
      const newName = prompt("Enter name",name);
      const newPhone = prompt('Enter new phone number:',phoneno);
      axios.put(`http://localhost:8080/update-phone/${id}`, { name: newName, phone: newPhone })
        .then(res => {
          setPhonebook(phonebook.map(item => item._id === id ? res.data.data : item));
        })
        .catch(err => console.log(err));
    };
    const deleteNumber = (id) => {
      axios.delete(`http://localhost:8080/delete-phone/${id}`)
        .then(res => {
          setPhonebook(phonebook.filter(item => item._id !== id));
        })
        .catch(err => console.log(err));
    };
    return (
      <div className='container'>
        <h1>PhoneBook</h1>
        {
        phonebook.map((val,key)=>{
          return <div key={key} className="card">
            <p>Name :{val.name}</p>
            <p>Number{val.phone}
            </p>
            <button onClick={() => updateNumber(val._id,val.name,val.phone)}>Update</button>
            <button onClick={() => deleteNumber(val._id)}>Delete</button>
            </div>})}<hr/>
            <h2>Add New Number</h2>
    <label htmlFor="">Name: </label>
    <input type="text" onChange={(e)=>{setName(e.target.value)}}/><br/><br/>
    <label htmlFor="">Phone: </label>
    <input type="number" onChange={(e)=>{setPhone(e.target.value)}}/><br/><br/>
    <button onClick={addNewNumber}>Add New Number</button>
    </div>
  );
}

export default App;