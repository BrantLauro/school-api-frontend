import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você será deslogado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deslogar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.localStorage.removeItem('token'); // Remove o token do localStorage
        navigate('/login'); // Redireciona para a tela de login
        Swal.fire(
          'Deslogado!',
          'Você foi deslogado com sucesso.',
          'success'
        )
      }
    })
  };

  return (
    <div className='screen'>
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className='title'>Sistema Escolar</h1>
        <a href="/school" className='btn mb-4 w-40 text-center'>Escolas</a>
        <a href="/student" className='btn mb-4 w-40 text-center'>Estudantes</a>
        <button onClick={handleLogout} className='btn w-40'>Logout</button>
      </div>
    </div>
  )
}

export default Home