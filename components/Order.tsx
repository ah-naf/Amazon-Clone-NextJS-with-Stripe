import React from "react";
import { OrderType } from "../utils/type";

export default function Order({ order }: PropsType) {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
          <div>
              <p className="font-bold text-xs">ORDER PLACED</p>
              <p>{new Date(order.date).toDateString()}</p>
          </div>

          <div>
              <p className="font-bold text-xs">TOTAL</p>
              <p>${order.amount}</p>
          </div>

          <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">{order.images.length} items</p>
          <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs">ORDER # {order.order_id}</p>
      </div>
      <div className="p-5 sm:p-10">
          <div className="flex space-x-6 overflow-x-auto">
            {order.images.map((image, index) => (
                <img src={image} alt="" key={index} className="h-20 object-contain sm:h-32" />
            ))}
          </div>
      </div>
    </div>
  );
}

interface PropsType {
  order: OrderType;
}
