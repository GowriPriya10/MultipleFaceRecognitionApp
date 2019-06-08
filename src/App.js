import React,{Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Dialog from './Components/Dialog/Dialog.js';
import Profile from './Components/Profile/Profile.js';
import ChangePassword from './Components/Profile/ChangePassword.js';
import Score from './Components/Score/Score';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesOptions={
                  particles: {
                    number: {
                      value: 200,
                      density:{
                        enable: true,
                        value_area: 1000
                      }
                    },
                    line_linked: {
                    shadow: {
                      enable: true,
                      color: "#3CA9D1",
                      blur: 5
                    }
                  }
                }
                  
                }

const initialState ={
      input: '',
      imageurl: '',
      boxes: [],
      route: 'signIn',
      isSignedIn: false,
      user:{
        email:'',
        id:'',
        name:'',
        entries:0,
        joined:''
      }
}

class App extends Component{
  constructor(){
    super();
    this.state=initialState; 
  }

  loadUser =(data)=>{
    this.setState({user: {
        email:data.email,
        id:data.id,
        name:data.name,
        entries:data.entries,
        joined:data.joined

    }})
  }

  calculateFaceLocation =(data) => {
      const image = document.getElementById('inputImage');
      const width = Number(image.width);
      const height =Number(image.height);
      return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }

  displayFaceBox = (boxes) =>{
    this.setState({boxes : boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit =()=>{
    this.setState({imageurl:this.state.input});
    fetch('https://warm-ridge-28737.herokuapp.com/imageUrl',{
          method:'post',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
      })
    .then(response=>response.json())
    .then(response =>{
      if(response){
        fetch('https://warm-ridge-28737.herokuapp.com/image',{
          method:'put',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response=> response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user,{
              entries:count
          }))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
      .catch(err => console.log(err));
  }

  onRouteChange =(route) =>{
    if(route ==='signout'){
        this.setState(initialState)
    }
    else if(route === 'profile'){
        this.setState({isSignedIn: true})
    }
    else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }


renderSwitch=(route)=>{
  const {isSignedIn,imageurl,boxes,user} = this.state;
  switch(route){
              case 'home':
                 return <div>
                    <Logo />
                    <Rank 
                    name={this.state.user.name} 
                    entries={this.state.user.entries} />

                    <ImageLinkForm 
                    onInputChange={this.onInputChange} 
                    onButtonSubmit={this.onButtonSubmit}/>

                    <FaceRecognition imageurl={imageurl} boxes= {boxes}/>
                  </div>
                break;
              case 'signIn':
                    return <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  break;
              case 'register':
                   return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  break;
              case 'profile':
                    return <Profile  id={user.id} onRouteChange={this.onRouteChange}/>
                  break;
              case 'score':
                    return <Score />
              case 'changepassword':
                    return <ChangePassword email={user.email} onRouteChange={this.onRouteChange}/>
              case 'signout':
                    return <SignIn/>
  }
}


  render(){
    const {isSignedIn,imageurl,route,boxes} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
                params={particlesOptions}
              />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {this.renderSwitch(route)}
      </div>
    );
  }
}

export default App;
