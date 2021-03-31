// TODO: Style product page, attributes will need to be rendered depending on category
// TODO: render attributes similar to how you did with header cells
function Product({ location }) {
  const product = location.state.product
  const category = location.state.category
  return (
    <div>
      <h1>
        {product.brand} {product.model}
      </h1>
      <h2>{category}</h2>
    </div>
  )
}

export default Product
