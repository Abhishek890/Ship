export interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface ShippingData {
  from: Address;
  to: Address;
}