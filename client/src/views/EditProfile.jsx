import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class EditProfile extends React.Component{

  state = { currentUser: this.props.currentUser }

  componentWillMount(){
    axios({method: 'get', url: `/api/users/${this.props.currentUser._id}`})
    .then(res=>{
      this.setState({
         ...this.state,
         currentUser: res.data
      })
    })
  }

  onInputChange(evt) {
    evt.preventDefault()
    this.setState({
      currentUser: {
        ...this.state.currentUser,
        [evt.target.name]: evt.target.value
      }
    })
  }
  
  onFormSubmit(evt) {
    evt.preventDefault()
    const data = {...this.state.currentUser}
    delete data._id
    delete data.__v
    delete data.iat
    axios({method: "patch", url: `/api/users/${this.state.currentUser._id}`, data: data})
      .then(res => {
        const updatedUser = res.data.updatedUser
        const token = res.data.token
        if (res.data.success){
          this.props.onUpdateSuccess(updatedUser, token)
        }
        this.props.history.push('/profile')
    })
  }

  onDeleteClick(){
    axios({method: "delete", url: `/api/users/${this.state.currentUser._id}`})
      .then(res => {
        if(res.data.success) this.props.onUserDelete()
        return < Redirect to='/login' />
      })
  }

  render() {
    const {currentUser} = this.state
    return(
      <div className="EditProfile row">
        <div className="col-2"></div>
        <div className="col-8">
        
        <h3>Edit your profile {currentUser.firstName}</h3>
        <form className="form-group" onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
          First Name: <input className="form-control" type="text" defaultValue={currentUser.firstName} name="firstName" />
          Last Name: <input className="form-control" type="text" defaultValue={currentUser.lastName} name="lastName"/>
          Credential: <input className="form-control" type="text" name="credential" defaultValue={currentUser.credential} />
          City: <input className="form-control" type="text" name="city" defaultValue={currentUser.city} />
          State: <input className="form-control" type="text" name="state" defaultValue={currentUser.state} />
          Profile Image: <input className="form-control" type="text" name="profileImageUrl" defaultValue={currentUser.profileImageUrl} />
					<button className="btn btn-success mb-3 mt-3">Update</button>
        </form>
        <button className="btn btn-danger mb-3 mt-3" onClick={this.onDeleteClick.bind(this)}>Delete Profile</button>
        </div>
        <div className="col-2"></div>
      </div>
    )
  }

}

export default EditProfile