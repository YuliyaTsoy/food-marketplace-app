import Filter from '../components/Filter'

function Product() {
    return (
        <div className="product-card bg-red-200">
            Hellooooo
        </div>
    )
};


export default function Home() {
    return (
        <div>
            <h1 className="font-bold">this is the home page</h1>
            <div className="grid gap-4 grid-cols-4">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </div>
        </div>
    );
}
