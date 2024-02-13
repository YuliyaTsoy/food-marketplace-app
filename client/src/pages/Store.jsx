import ProductCard from '../components/ProductCard'
import { useQuery } from '@apollo/client'
import { GET_MYSTORE } from '../utils/queries'

export default function Store() {
    // get user info using UseQuery method
    const { loading, data } = useQuery(GET_MYSTORE)
    const userStore = data?.myStore || {}
    console.log(userStore)

    // if data is not defined, it will show a loading prompt
    if (loading) {
        return <h2>LOADING...</h2>
    }

    // when data is defined it will return this: 
    return (
        <>
            <div><h1>this is your store page</h1></div>
        </>
    )
};