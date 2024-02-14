import React from "react";

function About() {
  return (
    <>
      <div className="">
        <div className="text-4xl text-center font-bold m-8">
          <h1 className="font-sans">Finding Fresh Choices Made Easy</h1>
        </div>

        <div className="about-container flex m-10 flex-col md:flex-row">
          <div className="p-8 m-3  rounded-2xl shadow-xl">
            <p className="text-black-700 text-wrap text-center mt-8">
              Fresh Finder is an online marketplace for local food that connects
              consumers with local farmers, producers, and artisans in their
              area. This application provides a convenient way for people to
              access fresh, locally sourced products without having to visit
              physical farmers' markets or stores. Users can browse through a
              wide range of food items, including fruits, vegetables, meats,
              dairy products, baked goods, and more. Our marketplace prioritizes
              sustainability, supporting small-scale farmers, and promoting
              organic or ethically produced food. Fresh Finder offers
              opportunity to enjoy the benefits of fresh food while supporting
              local small businesses.
            </p>
          </div>

          <div className=" m-3  rounded-2xl  shadow-xl">
            <img
              className="lg:size-full md:object-cover rounded-2xl"
              src="./about-pic.jpg"
              alt="about-pic"
            />
          </div>
        </div>
        <div className="flex m-10 flex-col md:flex-row">
          <div className="buyers-benefits p-8 m-3  rounded-2xl border-slate-300 shadow-xl">
            <h1 className="underline mb-3">Benefits for Buyers</h1>
            <div>
              <ul>
                <li>1. Access to a variety of fresh food options</li>
                <li>
                  2. Ability to have direct communication with sellers, enabling
                  them to ask questions about the products, their origins, and
                  any specific requirements they may have
                </li>
                <li>
                  3. Opportunity to find unique and specialty items that may not
                  be available in traditional grocery stores, providing them
                  with a diverse and exciting culinary experience.
                </li>
              </ul>
            </div>
          </div>
          <div className="sellers-benefits p-8 m-3 rounded-2xl border-slate-300 shadow-xl">
            <h1 className="underline mb-3"> Benefits for Sellers</h1>
            <div>
              <ul>
                <li>
                  1. Gain exposure to a larger customer base including those who
                  actively seek out local and sustainable food options. This
                  increased visibility can lead to higher sales and brand
                  recognition.
                </li>
                <li>
                  2. Establish direct relationships with their customers,
                  allowing them to receive feedback, build loyalty, and tailor
                  their offerings to meet specific demands.
                </li>
                <li>
                  3. Allows sellers to showcase their products, tell their
                  story, and differentiate themselves from competitors.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="key-features p-8 m-3  rounded-2xl border-slate-300 shadow-xl">
          <h1 className="underline mb-3">Key features</h1>

          <ul>
            <li>- Search for products</li>
            <li>- ilter by different Categories</li>
            <li>- Login / Sign-up</li>
            <li>- List products</li>
            <li>- See all products in the Sellers Store</li>
            <li>- Saving a product to order list</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;
