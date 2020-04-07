import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

         
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      number:null,
      listOfEntries:[],
      showEntries:false,
      gender:'',
      saveStatus:''
    };
  }
setName=(event)=>{
  this.setState({
    name:event.target.value
  })
  console.log(this.state.name)
}

setNumber=(event)=>{
  this.setState({
    number:event.target.value
  })
  console.log(this.state.number)
}
 


showEntries = () => {
  if(this.state.showEntries){
    this.setState({
      showEntries:false
    })

  }
  else{
    this.setState({
      showEntries:true
    })
  }

}
saveLocally = () => {
    let details = JSON.stringify(this.state.listOfEntries);
    localStorage.setItem('details',details);
  }

  checkGender = async(name) => {
    const response = await fetch(`https://api.genderize.io/?name=${name}`);
    console.log(response);
    const myJson = await response.json();
    console.log(myJson);
    return myJson.gender
  }
   saveDetails= async() =>{
    const gender= await this.checkGender(this.state.name)
  let entry={
    name:this.state.name,
    number:this.state.number,
    gender:gender,
 }
 console.log(entry)
 this.setState({
   listOfEntries:[...this.state.listOfEntries,entry],
   name:'',
   number:'',
   gender:'',
 })
 console.log(this.state.listOfEntries)
}

  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "lightpink",
      padding: "10px",
      fontFamily: "Arial"
    };
  

   let entries=this.state.listOfEntries.map((eachEntry,index)=>(
     <p>{index +1} Name is: {eachEntry.name} and phone number is {eachEntry.number} and gender is {eachEntry.gender}</p>
   ))
    return (
       
      <div>
       <h1 style={mystyle}>GENDER FINDER REPOSITORY</h1>
      <input onChange={this.setName} placeholder="Enter name...."value=
      {this.state.name}/>
      <br/>
      <br/>
      <input type="number" onChange={this.setNumber} placeholder="Enter Number...." value={this.state.number}/>
      <br/>
      <br/>
      <button  onClick={this.saveDetails}>Save</button>
      <br/>
      <br/>
      <button onClick={this.showEntries}>show All</button>
           <br/>
           <br/>
      <button onClick={this.saveLocally}>Save Locally</button>
      {this.state.saveStatus === 'LOADING' && <h3>Saving...</h3>}
      {this.state.saveStatus === 'SAVE_SUCCESS' && <h3>Saved Succesfully</h3>}

           
           {this.state.showEntries && entries}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));