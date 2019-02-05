import React, { Component } from 'react'
import Navbar from 'react-bootstrap'
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import './Signup.css'
import { timingSafeEqual } from 'crypto';
import axios from 'axios'
import Modal from '../Layout/UI/Modal/Modal'   

export default class Signup extends Component {

    state={
        email: '',
        isValidEmail: false,
        name: '', 
        isValidName: false,
        isValidAddress: false,
        address: '',
        address2: '',
        phoneNumber: '',
        moreAddresses: false,
        morePhoneNumbers: false,
        successfullPost: false,
        res: {}
    }

//validate email
emailValidatorHandler = () =>{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(this.state.email))
    this.setState({isValidEmail: re.test(this.state.email)})
}

//validate name
nameValidatorHandler = () =>{
  if((this.state.name.length > 2 && this.state.name.length < 40 && this.state.name.includes(' '))){
    console.log(this.state.name.split(' ')[1].length > 2, this.state.name.split(' ')[1].length < 30)
    if(this.state.name.split(' ')[1].length > 2 && this.state.name.split(' ')[1].length < 30)
    this.setState({isValidName: true}) 
  }else{
    this.setState({isValidName: false})
  }
}

//validate address
addressValidatorHandler = () =>{
  console.log(this.state.isValidAddress)
  console.log(this.state.address, this.state.address2)
  if(this.state.moreAddresses) {
   if(this.state.address.length > 6 && this.state.address2.length > 6 && this.state.address !== this.state.address2){
   this.setState({isValidAddress: true})
   }else{
     this.setState({isValidAddress: false})
   }
 }else if(this.state.address.length > 6 && !this.state.moreAddresses){
   this.setState({isValidAddress: true})
 }else{
   this.setState({isValidAddress: false})
 }
}

//validate phone
phoneValidatorHandler = () =>{
  console.log(/^\d+$/.test(this.state.phoneNumbers))
  this.setState({isValidPhone: (this.state.phoneNumber.length > 6 && this.state.phoneNumber.length < 13 && /^\d+$/.test(this.state.phoneNumber))})
}

//submitter handler
onSubmithandler = e=>{
  e.preventDefault();
  const requestForm = {
    email: this.state.email,
    name: this.state.name,
    addresses: [this.state.address, this.state.address2],
    phoneNumber: this.state.phoneNumber
  }
  axios.post("https://submitform-87b3a.firebaseio.com/'test'.json", requestForm)
  .then(response =>{
    console.log(response)
    let res = Object.assign({}, this.state.res)
    res.id = response.data.name;
    res.data = response.config.data
    this.setState({successfullPost: true, res})
  })

}

closeModalHandler = () =>
  this.setState({successfullPost: false})

 

render(){
  console.log(this.state.res)
    console.log(this.state.name.split(' ')[1])
    console.log(this.state.successfullPost)
    
    return (
      <div>
        <h1>Sign up form</h1>
        <form>
  <fieldset>
    <legend>Example of validating a signup form</legend>
    <div class="form-group">
      <label for="email">Email address</label>
      <input type="email" class={ this.state.isValidEmail ?"form-control is-valid" : "form-control"} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => this.setState({email: e.target.value}, () => this.emailValidatorHandler())}/>
      {this.state.isValidEmail ?
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone</small>
      :  <small id="emailHelp" class="form-text text-muted">Please enter a valid email address</small> }
    </div>


    <div class="form-group">
      <label for="Name">Name</label>
      <input type="text" class={this.state.isValidName ?"form-control is-valid" : "form-control"} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" onChange={(e) => this.setState({name: e.target.value}, () => this.nameValidatorHandler())}/>
      {this.state.isValidName ?
      <small id="emailHelp" class="form-text text-muted">Welcome aboard {this.state.name.split(' ')[0]}</small>
      :  <small id="emailHelp" class="form-text text-muted">Please enter your firstname and lastname</small> }
    </div>


    <div class="form-group">
      <label for="Address">Address</label>
      <input type="text" class={ this.state.isValidAddress ?"form-control is-valid" : "form-control"} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter address" onChange={(e) => this.setState({address: e.target.value}, () => this.addressValidatorHandler())}/>
      {this.state.isValidAddress ?
      <small id="emailHelp" class="form-text text-muted">We'll never share your address with anyone</small>
      :  <small id="emailHelp" class="form-text text-muted">Please enter a your address</small> }

<CSSTransitionGroup 
transitionName="example"
transitionEnterTimeout={300}
transitionLeaveTimeout={100}>
      {this.state.moreAddresses &&
  <div class="form-group" style={{transition: '2s'}}>
      <label for="Address">Second Address</label>
      <input type="text" class={ this.state.isValidAddress ?"form-control is-valid" : "form-control"} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter address" onChange={(e) => this.setState({address2: e.target.value}, () => this.addressValidatorHandler())}/>
      {this.state.isValidAddress ?
      <small id="emailHelp" class="form-text text-muted">We'll never share your address with anyone</small>
      : <small id="emailHelp" class="form-text text-muted">Please enter  your second address</small>}
      {(this.state.address === this.state.address2 && this.state.address !== '' ) &&
      <small id="emailHelp" class="form-text text-muted">Addresses cannot be the same</small>}
       </div>
      }
      </CSSTransitionGroup>
      
{/* JSX code for succes-popup modal */}

<div>
<Modal show={this.state.successfullPost} onClose={this.closeModalHandler}>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h2>Success!</h2>
        <p>A request was saved in a firebase database</p>
        {this.state.res &&
        <div>
        <p>Id:  {this.state.res.id}</p>
        <p>Data:  {JSON.stringify(this.state.res.data, undefined, 2)}</p>
        </div>
        }
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</Modal>
</div>



  <div class="custom-control custom-switch">
      <input type="checkbox" class="custom-control-input" disabled="" id="customSwitch2" onChange={e => this.setState(prevstate => ({
        moreAddresses: !prevstate.moreAddresses
      }), ()=> this.addressValidatorHandler())} />
      <label class="custom-control-label" for="customSwitch2">I have more than one address</label>
    </div>
      </div>
      <br />
    
     
    <div class="form-group">
      <label for="Phone">Phone number</label>
      <input type="text" class={ this.state.isValidPhone ?"form-control is-valid" : "form-control"} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter phone number" onChange={e => this.setState({phoneNumber: e.target.value}, () => this.phoneValidatorHandler())}/>
      {this.state.isValidPhone ?
      <small id="emailHelp" class="form-text text-muted">We'll never share your phone number with anybody</small>
      :  <small id="emailHelp" class="form-text text-muted">Please enter your phone number</small> }
    </div>
    </fieldset>
<br/>
    <button type="button" style={{width: '40%', height: '3em'}} class="btn btn-primary submit-btn" onClick={e => this.onSubmithandler(e)}>Submit</button>
    <br/>
    <br/>

   </form>
   </div>
     
    )
  }
}
