import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'

import Rails from 'rails-ujs'
import React from 'react'
import { render } from 'react-dom'

import App from 'components/App'
import 'assets/styles/app-styles'

Rails.start();

console.log('App Pack')

render(<App />, document.getElementById('root'))