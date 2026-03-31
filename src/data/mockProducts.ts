export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  category: string;
}

export const CATEGORIES = ['All', 'Outerwear', 'T-Shirts', 'Sweatshirts', 'Knitwear', 'Shirts', 'Misc'];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Essential Oversized Hoodie',
    brand: 'STUDIO BLANK',
    price: 69000,
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop',
    category: 'Sweatshirts'
  },
  {
    id: 'p2',
    name: 'Classic Basic T-Shirt',
    brand: 'COTTON LAB',
    price: 29000,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop',
    category: 'T-Shirts'
  },
  {
    id: 'p3',
    name: 'Vintage Leather Jacket',
    brand: 'ROUGH',
    price: 189000,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600&auto=format&fit=crop',
    category: 'Outerwear'
  },
  {
    id: 'p4',
    name: 'Cozy Knit Sweater',
    brand: 'WARMTH',
    price: 89000,
    imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop',
    category: 'Knitwear'
  },
  {
    id: 'p5',
    name: 'Streetwear Zip-up Hoodie',
    brand: 'URBAN',
    price: 75000,
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=600&auto=format&fit=crop',
    category: 'Sweatshirts'
  },
  {
    id: 'p6',
    name: 'Minimal White Tee',
    brand: 'STUDIO BLANK',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=600&auto=format&fit=crop',
    category: 'T-Shirts'
  },
  {
    id: 'p7',
    name: 'Denim Trucker Jacket',
    brand: 'ROUGH',
    price: 125000,
    imageUrl: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=600&auto=format&fit=crop',
    category: 'Outerwear'
  },
  {
    id: 'p8',
    name: 'Signature Logo T-Shirt',
    brand: 'URBAN',
    price: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600&auto=format&fit=crop',
    category: 'T-Shirts'
  },
  {
    id: 'p9',
    name: 'Chunky Wool Sweater',
    brand: 'WARMTH',
    price: 112000,
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop',
    category: 'Knitwear'
  },
  {
    id: 'p10',
    name: 'Oversized Plaid Shirt',
    brand: 'COTTON LAB',
    price: 68000,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop',
    category: 'Shirts'
  },
  {
    id: 'p11',
    name: 'Classic White Crop Tee',
    brand: 'STUDIO BLANK',
    price: 32000,
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop',
    category: 'T-Shirts'
  },
  {
    id: 'p12',
    name: 'Nylon Utility Jacket',
    brand: 'URBAN',
    price: 165000,
    imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop',
    category: 'Outerwear'
  },
  {
    id: 'p13',
    name: 'Blue & Black Check Shirt',
    brand: 'DUMMY WEAR',
    price: 45000,
    imageUrl: 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp',
    category: 'Shirts'
  },
  {
    id: 'p14',
    name: 'Gigabyte Aorus Men Tshirt',
    brand: 'GAMER FIT',
    price: 32000,
    imageUrl: 'https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/1.webp',
    category: 'T-Shirts'
  },
  {
    id: 'p15',
    name: 'Man Plaid Shirt',
    brand: 'URBAN',
    price: 38000,
    imageUrl: 'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/1.webp',
    category: 'Shirts'
  },
  {
    id: 'p16',
    name: 'Man Short Sleeve Shirt',
    brand: 'STUDIO BLANK',
    price: 29000,
    imageUrl: 'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/1.webp',
    category: 'Shirts'
  },
  {
    id: 'p17',
    name: 'Men Check Shirt',
    brand: 'COTTON LAB',
    price: 41000,
    imageUrl: 'https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp',
    category: 'Shirts'
  },
  {
    id: 'p18',
    name: "Black Women's Gown",
    brand: 'ELEGANCE',
    price: 185000,
    imageUrl: "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp",
    category: 'Misc'
  },
  {
    id: 'p19',
    name: 'Corset Leather With Skirt',
    brand: 'ROUGH',
    price: 135000,
    imageUrl: 'https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/1.webp',
    category: 'Misc'
  },
  {
    id: 'p20',
    name: 'Corset With Black Skirt',
    brand: 'URBAN',
    price: 115000,
    imageUrl: 'https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/1.webp',
    category: 'Misc'
  },
  {
    id: 'p21',
    name: 'Dress Pea Green',
    brand: 'WARMTH',
    price: 89000,
    imageUrl: 'https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/1.webp',
    category: 'Misc'
  },
  {
    id: 'p22',
    name: 'Marni Red & Black Suit',
    brand: 'ELEGANCE',
    price: 215000,
    imageUrl: 'https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/1.webp',
    category: 'Outerwear'
  },
  {
    id: 'p23',
    name: 'Nike Air Jordan 1 Red/Black',
    brand: 'NIKE',
    price: 245000,
    imageUrl: 'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp',
    category: 'Misc'
  },
  {
    id: 'p24',
    name: 'Puma Future Rider Trainers',
    brand: 'PUMA',
    price: 125000,
    imageUrl: 'https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/1.webp',
    category: 'Misc'
  }
];
