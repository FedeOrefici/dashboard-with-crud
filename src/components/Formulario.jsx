import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'

const Formulario = ({cliente}) => {

    const navigate = useNavigate()

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
                   .typeError('El número no es válido')
                   .integer()
                   .positive()
                   

    })

    const handleSubmit = async (valores) => {
        try {

            let respuesta;

            if(cliente.id) {
                //Registrando un registro
                const url = `http://localhost:4000/clientes/${cliente.id}`

                respuesta = await fetch (url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            } else {
                //Nuevo registro
                const url = 'http://localhost:4000/clientes'

                //pd
                respuesta = await fetch (url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
    
                await respuesta.json()
                navigate('/clientes')
            }

        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md
    md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>


        <Formik
        //leer valores del formulario
        initialValues={{
            nombre: cliente?.nombre ?? "",
            empresa: cliente?.empresa ?? "",
            email: cliente?.email?? "",
            telefono: cliente?.telefono ?? "",
            notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}

        onSubmit={ async (values, {resetForm} ) => {
            await handleSubmit(values)

            resetForm();
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
                value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg'
                
                />

                
            </Form>
            )}}
        </Formik>


    </div>
  )
}

Formulario.defaultProps = {
    cliente: {}
}

export default Formulario