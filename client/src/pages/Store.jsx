import ProductCard from '../components/ProductCard'
import { useQuery } from '@apollo/client'
import { GET_MYSTORE } from '../utils/queries'

export default function Store() {
    // get user info using UseQuery method
    const { loading, data } = useQuery(GET_MYSTORE)
    const userStore = data?.myStore || {}
    console.log(userStore)
    return <div><h1>this is your store page</h1></div>
};