import React from 'react'

const Home = () => {
  return (
    <div className='screen'>
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className='title'>Sistema Escolar</h1>
        <a href="/school" className='btn mb-4'>Escolas</a>
        <a href="/student" className='btn'>Estudantes</a>
      </div>
    </div>
  )
}

export default Home