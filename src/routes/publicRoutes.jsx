import { Route } from "react-router-dom";

import { PublicLayout } from "../layout";

import BecomeAgent from "../features/agent/pages/BecomeAgent";
import LandingPage from "../features/landing/LandingPage";
import ProductDetails from "../features/products/pages/ProductDetails";
import About from "../features/about/pages/About";
import GetQuote from "../features/quotes/pages/GetQuote";
import Contact from "../features/landing/components/Contact";
import Products from "../features/products/pages/Products";
import Apply from "../features/customer/pages/Apply";

const publicRoutes = (
  <Route element={<PublicLayout />}>
    <Route
      path="/"
      element={<LandingPage />}
    />

    <Route
      path="/become-an-agent"
      element={<BecomeAgent />}
    />
    <Route
  path="/products"
  element={<Products />}
/>


    <Route
      path="/products/:id"
      element={<ProductDetails />}
    />

    <Route
  path="/about"
  element={<About />}
/>

    <Route
      path="/contact"
      element={<Contact />}
    />

<Route
      path="/get-quote"
      element={<GetQuote />}
    />
<Route
  path= "/apply"
  element={<Apply />}
  />
    
  
  </Route>
);

export default publicRoutes;