import ProductCard from '../components/ProductCard'
import { PencilIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@apollo/client'
import { GET_MYSTORE } from '../utils/queries'
import sampleProfile from '../assets/sampleProfile'


export default function Store() {
    // get user info using UseQuery method
    // const { loading, data } = useQuery(GET_MYSTORE)
    // const userStore = data?.myStore || {}
    const userStore = sampleProfile
    console.log(userStore)

    // if data is not defined, it will show a loading prompt
    // if (loading) {
    //     return <h2>LOADING...</h2>
    // }

    // when data is defined it will return this: 
    return (
        <>
            <div className='flex flex-col container m-4'>

                <div className='text-4xl font-bold'><h1>Welcome to {userStore.storeName}!</h1></div>
                {/* if the user has products, map through all of them and render using ProductCard component */}
                <div className='grid flex grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-x-12 my-6'>{userStore.store ? (<>
                    {userStore.store.map((product) => {
                        return (
                            <>
                                <div className='flex flex-col'>
                                    <div className='grid justify-items-end'>
                                        <XCircleIcon className='h-10 w-14 cursor-pointer' style={{ color: 'grey' }} />
                                    </div>
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        image={product.image}
                                        price={product.price}
                                        storeName={userStore.storeName} />
                                </div>
                            </>
                        )
                    }
                    )}
                </>
                ) : <p>your active listings will show here</p>}</div>
            </div>
        </>
    )
};