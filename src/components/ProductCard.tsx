import type { Product } from "../types/post.ts"

interface ProductCardProps{
    product: Product
}

export function ProductCard(props: ProductCardProps) {
    const { product } = props
    return(
        <div>
            <p>{ product.name }</p>
            <p>{ product.price }</p>
            <p>{ product.category }</p>
        </div>
    )
}