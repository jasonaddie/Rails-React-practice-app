import React from 'react'
import {
  FormGroup, TextArea, InputGroup, Intent, Button, Callout
} from '@blueprintjs/core'
import { Redirect } from 'react-router'

import {clientPost} from 'modules/client'

class PostNew extends React.Component {

  state = {
    submitDisabled: true,
    redirectTo: '',
    errorMessage: '',
    post: {
      title: '',
      description: ''
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target
    const newPost = { ...this.state.post, [name]: value }
    this.setState({ post: newPost })

    this.validateForm()
  }

  validateForm = () => {
    const { post } = this.state
    if (post.title && post.description) {
      this.setState({submitDisabled: false})
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { post } = this.state
    clientPost('/posts', { title: post.title, description: post.description })
      .then(response => {
        const { location } = response.headers
        if (location) {
          this.setState({redirectTo: location})
        } else {
          this.setState({redirectTo: '/posts'})
        }
      })
      .catch(errorMessage => {
        this.setState({errorMessage: errorMessage})
      });
  }

  render() {
    const { errorMessage, redirectTo, submitDisabled, post } = this.state
    if (redirectTo) {
      return <Redirect to={{ pathname: redirectTo, state: {message: 'Successfully created post.'}}} />
    } else {
      return(
        <div className="post-new__wrapper">
          <h1>Create a Post</h1>
          { errorMessage && <Callout title={errorMessage} intent={Intent.Error}/> }
          <FormGroup label="Post Title" labelFor="post-title" labelInfo="(required)" >
            <InputGroup id="post-title" name="title"  placeholder="Enter a title"
              value={post.title} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup label="Post Description" labelFor="post-description" labelInfo="(required)" >
            <TextArea id="post-description" name="description"  fill={true} placeholder="Description"
              value={post.description} onChange={this.handleChange}/>
          </FormGroup>
          <Button disabled={submitDisabled} icon="tick-circle" onClick={this.handleSubmit}>Create Post</Button>
        </div>
      )
    }
  }
}
export default PostNew