import React from 'react';

class ChangePassword extends React.Component{

constructor(props){
  super(props);
  this.state={
    Password:'',
    confirmPassword:'',
    result:''
  }
}

onPasswordChange =(event)=>{
  this.setState({Password: event.target.value})
}

onConfirmPasswordChange =(event)=>{
  this.setState({confirmPassword: event.target.value})
}

onSubmit=()=>{
  fetch('https://warm-ridge-28737.herokuapp.com/editpassword',{
    method: 'put',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      email:this.props.email,
      password: this.state.Password,
      confirmpassword:this.state.confirmPassword
    })
  }).then(response=>response.json())
  .then(res=>{
    this.setState({result:res})
  })
}

render(){
  const {onRouteChange} =this.props;
    return(
    <div>
    <article className="br3 shadow-5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Change Password</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="pass">Password</label>
              <input 
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="password" 
              name="pass"  
              id="pass"
              onChange={this.onPasswordChange}/>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="cpassword">Confirm Password</label>
              <input 
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
              type="password" 
              name="password"  
              id="password"
              onChange={this.onConfirmPasswordChange}/>
            </div>
          </fieldset>
          <div className="">
            <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Submit"  
              onClick={this.onSubmit}/>
          </div>
        </div>
      </main>
    </article>
    <p className="f3">{this.state.result}</p>
    </div>
  );
}
} 
export default ChangePassword;
