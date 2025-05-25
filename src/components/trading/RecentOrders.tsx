
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RecentOrders = () => {
  const orders = [
    {
      id: 1,
      symbol: "BTC",
      type: "Buy",
      amount: "0.1234",
      price: "$45,123.45",
      total: "$5,568.90",
      status: "Filled",
      time: "2 min ago"
    },
    {
      id: 2,
      symbol: "ETH",
      type: "Sell",
      amount: "2.5678",
      price: "$2,341.56",
      total: "$6,012.34",
      status: "Filled",
      time: "1 hour ago"
    },
    {
      id: 3,
      symbol: "SOL",
      type: "Buy",
      amount: "15.0",
      price: "$189.34",
      total: "$2,840.10",
      status: "Pending",
      time: "3 hours ago"
    },
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Recent Orders</h3>
          <Button variant="outline" size="sm" className="border-gray-600">
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex justify-between items-center py-3 border-b border-gray-800 last:border-b-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{order.symbol}</span>
                </div>
                <div>
                  <div className="font-medium">
                    <span className={order.type === "Buy" ? "text-green-500" : "text-red-500"}>
                      {order.type}
                    </span>
                    {" "}{order.amount} {order.symbol}
                  </div>
                  <div className="text-sm text-gray-400">{order.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{order.total}</div>
                <div className={`text-sm ${
                  order.status === "Filled" ? "text-green-500" : "text-yellow-500"
                }`}>
                  {order.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RecentOrders;
