import { Item } from "@/interfaces";

export async function getItem(id: string) {
  const item = itemsAPI.find((item) => item.id === id)!;

  return item;
}

export async function getItems() {
  return { items: itemsAPI };
}

const itemsAPI: Item[] = [
  {
    id: "0",
    name: "Nike Air Force 1 NDESTRUKT",
    price: "$303.99",
    quantity: "40",
    image: "/assets/images/bgcard.png",
    category: "shoes",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    sales: "20",
  },
];
