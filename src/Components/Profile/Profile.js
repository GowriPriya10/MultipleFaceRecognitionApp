import React from 'react';
import ProCard from './ProCard.js';

class Profile extends React.Component{
constructor(props){
	super(props);
	this.state={
		data:[]
	}
}

componentDidMount(){
	fetch('https://warm-ridge-28737.herokuapp.com/profile/'+this.props.id)
	.then(response => response.json())
	.then(res => {
		console.log(res);
		this.setState({
			data: res
		})
	})
}

render(){
	const {onRouteChange} =this.props;
	const {data}=this.state;
    return(
    <div>
    	 <p onClick ={()=>onRouteChange('changepassword')} className='tr f3 link dim black underline pa3 pointer'>Change Password</p>
	    <ProCard data={data}/>
    </div>
  );
}
} 
export default Profile;
