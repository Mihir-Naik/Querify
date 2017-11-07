import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class EditProfile extends React.Component{
  constructor(props){
    super(props)
    this.state = { currentUser: this.props.currentUser }
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
    console.log("Form submit clicked")
    const data = {...this.state.currentUser}
    delete data._id
    delete data.__v
    delete data.iat
    console.log(data)
    // send patch with data
    axios({method: "patch", url: `/api/users/${this.state.currentUser._id}`, data: data})
      .then(res => {
        const updatedUser = res.data.updatedUser
        const token = res.data.token
        if (res.data.success){
          this.props.onUpdateSuccess(updatedUser, token)
        }
    })
  }

  onDeleteClick(){
    console.log("Delete Button clicked")
    axios({method: "delete", url: `/api/users/${this.state.currentUser._id}`})
      .then(res => {
        console.log(res)
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
					<button>Update</button>
        </form>
        <button onClick={this.onDeleteClick.bind(this)}>Delete Profile</button>
      </div>
    )
  }

}

export default EditProfile