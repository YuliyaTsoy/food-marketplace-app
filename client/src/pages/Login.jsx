import { Link } from 'react-router-dom'

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