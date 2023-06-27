import React from 'react';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {FileParser} from '../../utils/FileParser';
import UserService from '../../services/userService';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import regImage from '../../assets/register-img.png';
import HeadingTitle from "../../components/HeadingTitle/HeadingTitle";
import LinkInfo from "../../components/LinkInfo/LinkInfo";

function Register() {
    const navigate = useNavigate();

    const VALID_TYPE = ['image/jpeg', 'image/png', 'image/jpg'];
    let KB = 1024;
    let MB = KB * 1024;

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            gender: '',
            image: '',
            birthDate: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Field is required'),
            lastName: Yup.string().required('Field is required'),
            email: Yup.string().required('Field is required'),
            password: Yup.string().required('Field is required'),
            gender: Yup.string().required('Field is required'),
            birthDate: Yup.string().required('Field is required'),
            image: Yup.mixed()
                .required('Field is required')
                .test(
                    'fileSize',
                    'Wrong file size',
                    (value) => value.size < MB * 2
                )
                .test('fileType', 'Wrong file type', (value) =>
                    VALID_TYPE.includes(value.type)
                ),
        }),
        onSubmit: (values) => {
            FileParser(values.image)
                .then((res) => {
                    UserService.registerUser({...values, image: res})
                        .then((data) => {
                            if (data.status === 200) {
                                toast.success('User registration successful');
                                setTimeout(() => navigate('/login'), 3000);
                            } else {
                                toast.warning('User already registered');
                            }
                        })
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));

            formik.resetForm();
            // console.log(values);
        },
    });

    const showError = (name) =>
        formik.errors[name] &&
        formik.touched[name] &&
        formik.errors[name];

    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 mt-[53px] mb-[23px]">
            <div className="hidden lg:block">
                <img src={regImage} className="object-cover w-full" alt="reg-image"/>
            </div>
            <div className="lg:ml-[26px]">
                <HeadingTitle title='Register'/>
                <div>
                    <div className="border-[0.5px] rounded-lg border-primary mt-[52px]">
                        <form
                            onSubmit={formik.handleSubmit}
                            className='rounded px-[26px] mb-4'>
                            <div className="mt-[8px]">
                                <label className='text-[15px] text-gray-600'>
                                    Firstname:{' '}
                                    <span className='text-[14px] text-red-600'>
						                {showError('firstName')}
					                </span>
                                </label>
                                <input
                                    type='text'
                                    name='firstName'
                                    placeholder='Insert firstname'
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                                <p className="text-red-500 text-xs italic">{' '} {showError('firstName')}</p>
                            </div>
                            <div className="mt-[8px]">
                                <label className='text-[15px] text-gray-600'>
                                Lastname:{' '}
                                    <span className='text-[14px] text-red-600'>
                                        {showError('lastName')}
                                    </span>
                                </label>

                                <input
                                    type='text'
                                    name='lastName'
                                    placeholder='Insert lastname'
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                                <p className="text-red-500 text-xs italic">{' '} {showError('lastName')}</p>
                            </div>
                            <div className="mt-[8px]">
                                <label className='text-[15px] text-gray-600'>
                                    Email:{' '}
                                    <span className='text-[14px] text-red-600'>
                                    {showError('email')}
                                </span>
                                </label>
                                <input
                                    type='email'
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    placeholder='Insert email'
                                    className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                                <p className="text-red-500 text-xs italic">{' '} {showError('email')}</p>
                            </div>
                            <div className="mt-[8px]">
                                <label className='text-[15px] text-gray-600'>
                                    Password:{' '}
                                    <span className='text-[14px] text-red-600'>
                                        {showError('password')}
                                    </span>
                                </label>
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='Insert password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                            <div className="mt-[8px]">
                                <label className='text-[15px] text-gray-600'>
                                    Gender:{' '}
                                    <span className='text-[14px] text-red-600'>
                                        {showError('gender')}
                                    </span>
                                </label>
                                <select
                                    name='gender'
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                    <option value='' defaultChecked>
                                        Gender
                                    </option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                           <div className="mt-[8px]">
                                <label className='text-[15px] text-gray-600'>
                                    Image:{' '}
                                    <span className='text-[14px] text-red-600'>
                                        {showError('image')}
                                    </span>
                                </label>
                                <input
                                    type='file'
                                    name='image'
                                    onChange={(e) =>
                                        formik.setFieldValue(e.target.name, e.target.files[0])
                                    }
                                />
                                <p className="text-red-500 text-xs italic">{' '} {showError('image')}</p>
                            </div>
                            <div className="mt-[8px]">
                                <label className='text-[15px] text-gray-600'>
                                    Brithdate:{' '}
                                    <span className='text-[14px] text-red-600'>
                                        {showError('birthDate')}
                                    </span>
                                </label>
                                <input
                                    type='date'
                                    name='birthDate'
                                    value={formik.values.birthDate}
                                    onChange={formik.handleChange}
                                    className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                />
                            </div>
                            <div className="mt-[26px]">
                                <button
                                    type='submit'
                                    className='bg-primary w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <LinkInfo title="Already have an account?" linkTitle="Click here to Sign in." link="/login"/>
            </div>
        </div>
    );
}

export default Register;
