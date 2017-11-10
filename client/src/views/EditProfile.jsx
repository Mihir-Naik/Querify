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
      <div className="EditProfile">
        <h1>This is the edit page for {currentUser.firstName}</h1>
        <form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
          First Name: <input type="text" defaultValue={currentUser.firstName} name="firstName" />
          Last Name: <input type="text" defaultValue={currentUser.lastName} name="lastName"/>
          Credential: <input type="text" name="credential" defaultValue={currentUser.credential} />
          City: <input type="text" name="city" defaultValue={currentUser.city} />
          State: <input type="text" name="state" defaultValue={currentUser.state} />
          Profile Image: <input type="text" name="profileImageUrl" defaultValue={currentUser.profileImageUrl} />
					<button>Update</button>
        </form>
        <button onClick={this.onDeleteClick.bind(this)}>Delete Profile</button>
      </div>
    )
  }

}

export default EditProfile