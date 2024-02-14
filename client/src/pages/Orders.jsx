import React from "react";
import ProductCard from "../components/ProductCard";
import { useQuery } from "@apollo/client";
import { GET_USER_ORDERS } from "../utils/queries";

function Orders() {
  const { loading, error, data } = useQuery(GET_USER_ORDERS);
  console.log(data);

  const userOrders = data?.userOrders || {};
  // console.log(product);
  return (
    <>
      <div className="flex flex-col justify-items-center my-4 mx-10 px-3">
        <div className="text-4xl text-left font-bold">
          <h1>Your orders:</h1>
        </div>

        {userOrders.orders ? (
          <>
            <div className="grid flex grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-x-12 my-6">
              {userOrders.orders.map((product) => {
                return (
                  <>
                    <div className="flex flex-col">
                      <ProductCard
                        key={product._id}
                        name={product.name}
                        image={product.image}
                        price={product.price}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </>
        ) : (
          <p className="text-2xl font-bold">You have no orders!</p>
        )}
      </div>
    </>
  );
}

export default Orders;
