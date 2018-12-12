import React from 'react'

const Notification = ({ content }) => {
  if (content.message === null) {
    return null
  }
  return <div className={content.type}> {content.message} </div>
}

export default Notification
