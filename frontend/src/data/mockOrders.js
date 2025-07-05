const mockOrders = [
  {
    orderId: 'ORD123456',
    productName: 'Orthopedic Memory Foam Pillow',
    status: 'Delivered',
    price: 999,
    dateOfOrder: '2024-06-15T10:30:00Z',
    expectedDelivery: '2024-06-20T10:30:00Z',
  },
  {
    orderId: 'ORD987654',
    productName: 'Cooling Gel Mattress Topper',
    status: 'Shipped',
    price: 3499,
    dateOfOrder: '2024-06-28T14:45:00Z',
    expectedDelivery: '2024-07-05T10:30:00Z',
  },
  {
    orderId: 'ORD112233',
    productName: 'Bamboo Bed Sheets Set',
    status: 'Cancelled',
    price: 2299,
    dateOfOrder: '2024-05-01T08:00:00Z',
  },
];

export default mockOrders;
