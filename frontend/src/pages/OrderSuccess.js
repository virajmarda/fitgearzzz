import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';
import { Button } from '../components/ui/button';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-black">
      <div className="text-center max-w-md px-4">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        
        <h1 className="font-oswald text-4xl font-bold text-white mb-4">
          Order Placed!
        </h1>
        
        <p className="text-zinc-300 mb-8">
          Thank you for your purchase! You'll receive a confirmation email shortly.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate('/products')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase rounded-full px-8"
          >
            Continue Shopping
          </Button>
          
          <Button
            onClick={() => navigate('/account')}
            variant="outline"
            className="border-zinc-700 text-white hover:border-orange-500 hover:text-orange-500 font-oswald uppercase rounded-full px-8"
          >
            <Package className="w-4 h-4 mr-2" />
            View Orders
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
