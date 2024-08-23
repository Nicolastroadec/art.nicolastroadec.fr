import ProductList from "./(ui)/components/ProductList";
import Navbar from "./(ui)/components/Navbar";

function Home() {
  return (<>
    <div className="text-white bg-white">
      <ProductList />
    </div>
  </>
  );
}

export default Home;
