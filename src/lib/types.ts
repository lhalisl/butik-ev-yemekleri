export type Category = 'et-tandir' | 'tavuk' | 'ev-yemekleri' | 'corba-tatli';

export type Product = {
  id: string;
  menu_number: string; // 'soup', '1', '2', ..., '24', 'tatli'
  name: string;
  includes: string | null;
  price: number;
  category: Category;
  image_url: string | null;
  stock: number;
  min_stock: number;
  active: boolean;
  featured: boolean;
  created_at: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderStatus = 'bekliyor' | 'hazirlaniyor' | 'yolda' | 'teslim' | 'iptal';
export type DeliveryType = 'delivery' | 'pickup' | 'dine-in';

export type Order = {
  id: string;
  order_number: number;
  customer_name: string;
  customer_phone: string;
  customer_address: string | null;
  notes: string | null;
  total: number;
  status: OrderStatus;
  delivery_type: DeliveryType;
  created_at: string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product_name: string;
};

export type CreateOrderPayload = {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  notes: string;
  delivery_type: DeliveryType;
  items: { product_id: string; quantity: number; unit_price: number; product_name: string }[];
  total: number;
};
