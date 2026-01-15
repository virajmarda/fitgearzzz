import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center max-w-md">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="font-oswald text-4xl font-bold text-white mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-zinc-300 mb-8">
          Thank you for your purchase. You'll receive an email confirmation shortly.
        </p>
        <Button
          onClick={() => navigate('/products')}
          className="bg-orange-500 hover:bg-orange-600 text-white font-oswald uppercase rounded-full"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
