import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apiuser from '../../api/apisuser';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className='w-screen h-screen bg-neutral-900 text-white'>
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className='title'>Login</h1>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const result = await apiuser.post('/api/auth/login', values);
              Swal.fire({
                icon: 'success',
                title: 'Login bem-sucedido',
                text: result.data.message,
              });
              window.localStorage.setItem('token', result.data.token); // Armazena o token
              setSubmitting(false);
              navigate('/');
            } catch (error) {
              Swal.fire({
                icon: 'error',
                title: 'Erro no login',
                text: error.response.data || 'Invalid credentials',
              });
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col'>
              <label htmlFor="email" className='label'>Email</label>
              <Field type="email" name="email" className='input' />
              <ErrorMessage name="email" component="div" className='text-orange-500' />

              <label htmlFor="password" className='label'>Senha</label>
              <Field type="password" name="password" className='input' />
              <ErrorMessage name="password" component="div" className='text-orange-500' />

              <button type="submit" disabled={isSubmitting} className='btn'>
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className='mt-4'>
          Não possui cadastro? <Link to="/register" className='text-blue-500'>Registre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login