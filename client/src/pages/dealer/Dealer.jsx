import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import Posts from '../../components/posts/posts'
import "./dealer.css"

const Dealer = () => {
  return (
    <div className='dealer'>
      <div className='left'><Posts/></div>
      <div className='right'><Sidebar/></div>
    </div>
  )
}



export default Dealer
