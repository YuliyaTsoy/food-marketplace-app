import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'
import Auth from '../utils/auth'

export default function Login() {

    //set initial form state
    const [userFormData, setUserFormData] = useState({ email: '', password: '' })

    //Error message for input validation
    const [errorMessage, setErrorMessage] = useState({ email: '', password: '' })

    // color palette used in the page
    const colorPalette = {
        focus: 'ring-red-200',
        text: 'text-black-300',
        hoverBg: 'bg-red-300',
        currentBg: 'bg-red-800'
    };

    //bring mutation to login user
    const [loginUser, { error, data }] = useMutation(LOGIN_USER);

    //handle input change
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
        //check validity 
        value === '' ? setErrorMessage({ ...errorMessage, [name]: 'cannot be empty' }) : setErrorMessage({ ...errorMessage, [name]: '' })

        //check for validity for email
        if (name === 'email') {
            const regex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
            regex.test(value) ? setErrorMessage('') : setErrorMessage({ email: 'Please enter a valid email address' })
        }
    };

    //handleformsubmit
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //login user mutation and Auth
        try {
            const { data } = await loginUser({
                variables: { ...userFormData }
            });


            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }

        setUserFormData({
            email: '',
            password: '',
        });
    }

    return (

        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6"
                    onSubmit={handleFormSubmit}>
                    {/* email input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address  <span style={{ color: 'red', fontWeight: 'lighter', fontStyle: 'italic' }}> {errorMessage.email}</span>
                        </label>
                        <div className="mt-2">
                            <input id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={handleInputChange}
                                value={userFormData.email}
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    {/* password */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password
                                <span style={{ color: 'red', fontWeight: 'lighter', fontStyle: 'italic' }}> {errorMessage.password}</span></label>
                        </div>
                        <div className="mt-2">
                            <input id="password"
                                name="password"
                                type="password"
                                onChange={handleInputChange}
                                value={userFormData.password}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={!(userFormData.email && userFormData.password)}
                            className="flex w-full justify-center rounded-md bg-red-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Login</button>
                    </div>
                </form>

                {/* redirect user to create an account */}
                <h3 style={{ marginTop: '1rem', textAlign: 'center' }}> Don't have an account? Create and acount
                    <Link
                        to='/Signup'
                        style={{ color: 'blue' }}> here</Link>
                </h3>
            </div>
        </div >
    )
}