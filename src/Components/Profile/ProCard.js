import React from 'react';


class ProCard extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
    <article className="br4 shadow-5 ba dark-gray b--black-10 mv1 w-100 w-50-m w-25-l mw6 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="profile" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Profile</legend>
            <img alt='photo' src={`https://robohash.org/ ${this.props.data.name}/set_set5?size=100x100`} />
            <div style={{display: 'flex'}}>
              <p className="di fw6 f4" htmlFor="ID">ID:</p>
              <p className="f4">{this.props.data._id}</p>
            </div>
            <div style={{display: 'flex'}}>
              <p className="di fw6 f4" htmlFor="name">Name:</p>
              <p className="f4">{this.props.data.name}</p>
            </div>
            <div  style={{display: 'flex'}}>
              <p className="di fw6 f4" htmlFor="email">Email:</p>
              <p className="f4">{this.props.data.email}</p>
            </div>
            <div style={{display: 'flex'}}>
              <p className="di fw6 f4" htmlFor="entries">Entry Count:</p>
              <p className="f4">{this.props.data.entries}</p>
            </div>
            <div style={{display: 'flex'}}>
              <p className="di fw6 f4" htmlFor="joined">Joined:</p>
              <p className="f4 tj">{this.props.data.joined}</p>
            </div>
          </fieldset>
        </div>
      </main>
    </article>
  );
}
} 
export default ProCard;
