import React from 'react'
import EMPTYIMG from './../../assets/NoPostMobile.png'
const EmptyComp = ({title1,postTitle}) => {
    console.log(title1)
  return (
    
    <div className="flex justify-center items-center flex-col h-screen">
      <img src={EMPTYIMG} alt="" className="max-w-full max-h-full" />
      {title1 && <p className='font-bold text-xl'>{title1}</p>}
      {postTitle && <p className='text-sm'>{postTitle}</p>}
    </div>
  )
}

export default EmptyComp
