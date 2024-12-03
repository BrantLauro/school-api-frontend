import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apischool from '../../api/apischool';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterSchema = Yup.object().shape({
  schoolName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required').matches(/[a-zA-Z]/, 'Name can only contain letters!'),
  location: Yup.string().required('Required'),
  principalName: Yup.string().required('Required').min(2, 'Too Short!'),
});

const CreateSchool = () => {
  const navigate = useNavigate();

  return (
    <div className='w-screen h-screen bg-neutral-900 text-white'>
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className='title'>Cadastrar Escola</h1>
        <Formik
          initialValues={{ schoolName:'', location: '', principalName: '' }}
          validationSchema={RegisterSchema}
          onSubmit={async(values, { setSubmitting }) => {
            try {
              const result = await apischool.post('/school', values);
              Swal.fire({
                icon: 'success',
                title: 'Cadastro bem sucedido',
                text: 'A escola foi cadastrada com sucesso!',
              });
              setSubmitting(false);
              navigate('/school');
            } catch (error) {
              Swal.fire({
                icon: 'error',
                title: 'Erro no cadastro',
                text: error.response?.data?.message || 'An error occurred',
              });
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col'>
              <label htmlFor="schoolName" className='label'>Nome</label>
              <Field type="text" name='schoolName' className='input'></Field>
              <ErrorMessage name="schoolName"/>

              <label htmlFor="location" className='label'>Local</label>
              <Field type="text" name="location" className='input'/>
              <ErrorMessage name="location" component="div" className='text-orange-500'/>
              
              <label htmlFor="principalName" className='label'>Diretor(a)</label>
              <Field type="text" name="principalName" className='input'/>
              <ErrorMessage name="principalName" component="div" />
              
              <button type="submit" disabled={isSubmitting} className='btn'>
                cadastrar
              </button>
              
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default CreateSchool