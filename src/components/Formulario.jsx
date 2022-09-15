import React from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = () => {

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                   .min(3, 'El nombre es muy corto')
                   .max(20, 'El nombre es muy largo')
                   .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
                   .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
                   .email('Email')
                   .required('El email es obligatorio'),
        telefono: Yup.number()
                   .typeError('Número no es válido')
                   .integer()
                   .positive()
                   

    })

    const handleSubmit = (valores) => {
        console.log(valores);
    }


  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md
    md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>Agregar Cliente</h1>


        <Formik
        //leer valores del formulario
        initialValues={{
            nombre:'',
            empresa:'',
            email:'',
            telefono:'',
            notas:'',
        }}

        onSubmit={ (values) => {
            handleSubmit(values)
        }}

        //encontrar el schema de validación
        validationSchema={nuevoClienteSchema}
        >
            {({errors}) => {
                return (
             
            <Form className='mt-10'>

                <div className='mt-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='nombre'
                    >Nombre:</label>
                    <Field
                    id='nombre' 
                    type='text'
                    className='mt-2 block w-full p-3 bg-gray-30'
                    placeholder='Nombre del cliente'
                    name='nombre'
                    />

                    {errors.nombre ? (
                        <Alerta>{errors.nombre}</Alerta>
                    ): null }
                    
                </div>

                <div className='mt-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='empresa'
                    >Empresa:</label>
                    <Field
                    id='empresa' 
                    type='text'
                    className='mt-2 block w-full p-3 bg-gray-30'
                    placeholder='Empresa del cliente'
                    name='empresa'
                    />
                </div>

                <div className='mt-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='email'
                    >Email:</label>
                    <Field
                    id='email' 
                    type='email'
                    className='mt-2 block w-full p-3 bg-gray-30'
                    placeholder='Email del cliente'
                    name='email'
                    />
                </div>

                {errors.email ? (
                        <Alerta>{errors.email}</Alerta>
                ): null }

                <div className='mt-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='telefono'
                    >Teléfono:</label>
                    <Field
                    id='telefono' 
                    type='tel'
                    className='mt-2 block w-full p-3 bg-gray-30'
                    placeholder='Teléfono del cliente'
                    name='telefono'
                    />

                    {errors.telefono ? (
                        <Alerta>{errors.telefono}</Alerta>
                    ): null }
                </div>

                <div className='mt-4'>
                    <label
                    className='text-gray-800'
                    htmlFor='notas'
                    >Notas:</label>
                    <Field
                    as= 'textarea'
                    id='notas' 
                    type='text'
                    className='mt-2 block w-full p-3 bg-gray-30 h-40'
                    placeholder='Notas del cliente'
                    name='notas'
                    />
                </div>

                <input 
                type="submit"
                value='Agregar Cliente'
                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                />

                
            </Form>
            )}}
        </Formik>


    </div>
  )
}

export default Formulario