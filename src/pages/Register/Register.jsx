import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apiuser from '../../api/apisuser';
import { useNavigate } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
    username: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required').matches(/[a-zA-Z]/, 'Name can only contain letters!'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('No password provided.').min(8, 'Password is to short'),
});

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className='w-screen h-screen bg-neutral-900 text-white'>
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className='title'>Register</h1>
        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const resultado = await apiuser.post('/register', values);
              console.log(resultado);
              setSubmitting(false);
              navigate('/login');
            } catch (error) {
              console.log(error.response.data.message);
              alert(JSON.stringify(error.response.data.message, null, 2))
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col'>
              <label htmlFor="username" className='label'>Nome</label>
              <Field type="text" name='username' className='input'></Field>
              <ErrorMessage name="username"/>

              <label htmlFor="email" className='label'>Email</label>
              <Field type="email" name="email" className='input'/>
              <ErrorMessage name="email" component="div" className='text-orange-500'/>
              
              <label htmlFor="password" className='label'>Senha</label>
              <Field type="password" name="password" className='input'/>
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting} className='btn'>
                send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Register