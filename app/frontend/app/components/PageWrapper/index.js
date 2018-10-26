import React from 'react';
import MainNavbar from 'components/MainNavbar'

const PageWrapper = (props) => (
  <div>
    <MainNavbar />
    { props.children }
  </div>
)

export default PageWrapper