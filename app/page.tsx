import ProductList from "@components/ProductList";
async function Page() {
  return (<>
    <div className="text-white bg-white">
      <h1>Liste des produits</h1>
      <ProductList />
    </div>
  </>
  );
}

export default Page;
