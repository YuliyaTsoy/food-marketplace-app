import Filter from '../components/Filter'

<<<<<<< HEAD
// dummy import of tomato image
import {Tomato} from '../assets/samplepics/index'
=======
function Product() {
    return (
        <div className="product-card bg-red-200">
            Hellooooo
        </div>
    )
};
>>>>>>> parent of 6fa4bd5 (Added sample pics, some minor styling, and a semi-functional Product component that currently lives in Home.jsx but probably will be refactored)


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
