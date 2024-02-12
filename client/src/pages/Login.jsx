import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../utils/mutations'
import Auth from '../utils/auth'

export default function Login() {
    return <div>
        <h1 className="font-bold">Login page</h1>
        <h3>Create and acount
            <Link
                to='/Signup'
                style={{ color: 'blue' }}> here</Link>
        </h3>
    </div>
};