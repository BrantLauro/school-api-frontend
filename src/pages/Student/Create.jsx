import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import apistudent from '../../api/apistudent';
import apischool from '../../api/apischool';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  age: Yup.number().required('Required').min(1, 'Too Young!'),
  gender: Yup.string().required('Required'),
  schoolId: Yup.string().required('Required'),
});

const CreateStudent = () => {
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await apischool.get('/school');
        setSchools(response.data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div className='w-screen h-screen bg-neutral-900 text-white'>
      <div className="h-full flex flex-col justify-center items-center">
        <h1 className='title'>Register Student</h1>
        <Formik
          initialValues={{ name:'', age: '', gender: '' , schoolId: '' }}
          validationSchema={RegisterSchema}
          onSubmit={async(values, { setSubmitting }) => {
            try {
              const result = await apistudent.post('/student', values);
              Swal.fire({
                icon: 'success',
                title: 'Cadastro bem ucedido',
                text: 'O estudante foi cadastrado com sucesso!',
              });
              setSubmitting(false);
              navigate('/student');
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
              <label htmlFor="name" className='label'>Nome</label>
              <Field type="text" name='name' className='input'></Field>
              <ErrorMessage name="name" component="div" className='text-orange-500'/>

              <label htmlFor="age" className='label'>Idade</label>
              <Field type="number" name="age" className='input'/>
              <ErrorMessage name="age" component="div" className='text-orange-500'/>
              
              <label htmlFor="gender" className='label'>Gênero</label>
              <Field type="text" name="gender" className='input'/>
              <ErrorMessage name="gender" component="div" className='text-orange-500'/>

              <label htmlFor="schoolId" className='label'>Escola</label>
              <Field as="select" name="schoolId" className='input'>
                <option value="">Selecione uma escola</option>
                {schools.map(school => (
                  <option key={school.id} value={school.id}>{school.schoolName}</option>
                ))}
              </Field>
              <ErrorMessage name="schoolId" component="div" className='text-orange-500'/>

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

export default CreateStudent