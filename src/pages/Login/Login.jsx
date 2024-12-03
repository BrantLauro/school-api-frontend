import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apiuser from '../../api/apisuser';
import { useNavigate } from 'react-router-dom';

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
              alert(result.data.message); // Exibe a mensagem de sucesso
              setSubmitting(false);
              navigate('/'); // Redireciona para a página inicial
              // window.localStorage.setItem('token', result.data.token);
              // setSubmitting(false);
              // navigate('/');
                // console.log(result);
                // setSubmitting(false);
                // navigate('/login');
            } catch (error) {
              console.error('Login error:', error);
              alert(error.response.data || 'Invalid credentials'); // Exibe a mensagem de erro
              setSubmitting(false);
              // console.error('Login error:', error);
              // alert('Invalid credentials');
              // setSubmitting(false);
                // console.log(error.response.data.message);
                // alert(JSON.stringify(error.response.data.message, null, 2));
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col'>
              <label htmlFor="email" className='label'>Email</label>
              <Field type="email" name="email" className='input' />
              <ErrorMessage name="email" component="div" className='text-orange-500' />

              <label htmlFor="password" className='label'>Password</label>
              <Field type="password" name="password" className='input' />
              <ErrorMessage name="password" component="div" className='text-orange-500' />

              <button type="submit" disabled={isSubmitting} className='btn'>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login