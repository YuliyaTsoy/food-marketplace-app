import React from "react";

function About() {
  return (
    <>
      <div>
        <div className="text-4xl text-center font-bold">
          <h1>Satisfy Your Every Craving</h1>
        </div>
        <hr />
        <div className="about-container">
          <p>
            Fresh Finder is an online marketplace for local food that connects
            consumers with local farmers, producers, and artisans in their area.
            This application provides a convenient way for people to access
            fresh, locally sourced products without having to visit physical
            farmers' markets or stores. Users can browse through a wide range of
            food items, including fruits, vegetables, meats, dairy products,
            baked goods, and more. Our marketplace prioritizes sustainability,
            supporting small-scale farmers, and promoting organic or ethically
            produced food. Fresh Finder offers opportunity to enjoy the benefits
            of fresh food while supporting local small businesses.
          </p>
          <img className = "w-150 h-150" src="../src/assets/about-pic.jpg" alt="about-pic" />
        </div>
        <div className="buyers-benefits">
          <h1>Benefits for Buyers</h1>
          <div>
            <ul>
              <li>Access to a variety of fresh food options</li>
              <li>
                Ability to have direct communication with sellers, enabling them
                to ask questions about the products, their origins, and any
                specific requirements they may have
              </li>
              <li>
                Opportunity to find unique and specialty items that may not be
                available in traditional grocery stores, providing them with a
                diverse and exciting culinary experience.
              </li>
            </ul>
          </div>
        </div>
        <div className="sellers-benefits">
          <h1>Benefits for Sellers</h1>
        </div>
        <div>
          <ul>
            <li>
              Gain exposure to a larger customer base including those who
              actively seek out local and sustainable food options. This
              increased visibility can lead to higher sales and brand
              recognition.
            </li>
            <li>
              Establish direct relationships with their customers, allowing them
              to receive feedback, build loyalty, and tailor their offerings to
              meet specific demands.
            </li>
            <li>
              Allows sellers to showcase their products, tell their story, and
              differentiate themselves from competitors.
            </li>
          </ul>
        </div>
        <div className="key-features">
          <h1>Key features</h1>
        </div>
        <div>
          <ul>
            <li>Search for products</li>
            <li>Filter by different Categories</li>
            <li>Login / Sign-up</li>
            <li>List products</li>
            <li>See all products in the Sellers Store</li>
            <li>Saving a product to order list</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default About;
