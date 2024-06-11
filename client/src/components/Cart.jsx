import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { incrementQuantity, decrementQuantity, removeFromCart, clearCart } from '../features/CartSlice';
import { Helmet } from 'react-helmet';
import {TableBody,TableCell} from '@mui/material';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SnapMart- Cart</title>
        <meta name='description' content='Cart' />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Helmet>
      <motion.div
        className="container mx-auto py-8 shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl text-center font-bold mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring'}}
        >
          Cart
        </motion.h1>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <motion.table
                className="w-full table-auto"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <thead>
                  <tr className='border-4'>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Total</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <TableBody>
                  {cartItems.map((item) => (
                    <motion.tr
                      key={item.id}
                      className="border-b"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <TableCell className="px-4 py-2">
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-20 object-cover mx-auto"
                          whileHover={{ scale: 1.1 }}
                        />
                      </TableCell>
                      <TableCell className="px-4 py-2">${item.price}</TableCell>
                      <TableCell className="px-4 py-2">
                        <div className="flex items-center justify-center">
                          <motion.button
                            onClick={() => dispatch(decrementQuantity(item.id))}
                            className="text-rose-900 font-bold"
                            whileTap={{ scale: 0.9 }}
                          >
                            -
                          </motion.button>
                          <span className="mx-2">{item.quantity}</span>
                          <motion.button
                            onClick={() => dispatch(incrementQuantity(item.id))}
                            className="text-rose-900 font-bold"
                            whileTap={{ scale: 0.9 }}
                          >
                            +
                          </motion.button>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-2">${item.price * item.quantity}</TableCell>
                      <TableCell className="px-4 py-2">
                        <motion.button
                          onClick={() => handleRemoveItem(item.id)}
                          className='bg-rose-950 text-white px-4 py-2 rounded'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9, backgroundColor: '#3B0D0C' }}
                        >
                          Remove
                        </motion.button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </motion.table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <motion.button
                onClick={handleClearCart}
                className="bg-rose-950 text-white px-4 py-2 mx-4 rounded"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, backgroundColor: '#3B0D0C' }}
              >
                Clear Cart
              </motion.button>
              <div>
                <h2 className="text-2xl font-bold pr-4">Total Amount: ${getTotalAmount()}</h2>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
}

export default Cart;
