
export interface User {
  id: number;
  email: string;
}

export interface Cupcake {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends Cupcake {
  quantity: number;
}
