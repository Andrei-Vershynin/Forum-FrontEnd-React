import './App.css'
import { posts } from './data/posts'
import { ProductList } from './components/ProductList.tsx'

function App() {
  return (
    <div>
      <h1>Product catalog</h1>
      <ProductList
        products={posts.map(({ id, title }) => ({
          id,
          name: title,
          price: 0,
          image: '',
          category: 'Uncategorized',
        }))}
      />
    </div>
  )
}

export default App