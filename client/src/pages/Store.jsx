import ProductCard from '../components/ProductCard'
import { PencilIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { useQuery, useMutation } from '@apollo/client'
import { GET_MYSTORE } from '../utils/queries'
import sampleProfile from '../assets/sampleProfile'
import { DELETE_PRODUCT } from '../utils/mutations'


export default function Store() {
    // get user info using UseQuery method
    // const { loading, data } = useQuery(GET_MYSTORE)
    // const userStore = data?.myStore || {}
    const userStore = sampleProfile
    console.log(userStore)

    //use mutation DELETE_PRODUCT and refetches my store to update page
    const [deleteProduct, { error }] = useMutation(DELETE_PRODUCT,
        //     {
        //     refetchQueries: [
        //         GET_MYSTORE
        //     ]
        // }
    )

    //function that accepts _id (mongoDB) and deletes the product from the db
    const handleProductDelete = async (productId, productName) => {
        //show an alert to prompt the user
        const confirmPrompt = window.confirm(`are you sure you want to delete ${productName}?`)
        // if user clicked 'ok' delete product, if not do nothing
        confirmPrompt ? (console.log('wants to delete product ', productId)

            // const data = await deleteProduct({
            //     variables: { productId: productId }
            // })
        ) : ''
    }

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
                                    <div className='grid grid-cols-4 justify-items-end'>
                                        <XCircleIcon
                                            key={product._id}
                                            className='h-10 w-14 col-end-5 cursor-pointer'
                                            style={{ color: 'grey' }}
                                            onClick={() => handleProductDelete(product._id, product.name)} />
                                        {/* <PencilIcon className='h-6 w-6 col-end-4 cursor-pointer' /> */}
                                    </div>
                                    <ProductCard
                                        key={product._id}
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
                ) : <p className='text-2xl font-bold'>your active products will show here</p>}</div>
            </div>
        </>
    )
};