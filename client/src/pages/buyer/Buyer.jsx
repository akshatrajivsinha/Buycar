import React from 'react'
import Sidebar from '../../components/sidebar/sidebar'
import "./Buyer.css"
import Posts from '../../components/posts/posts'

const Buyer = () => {


  return (
    <div className='buyer'>
      <div className='left'><Posts/></div>
      <div className='right'><Sidebar/></div>
    </div>
  )
}

export default Buyer
