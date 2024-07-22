import { serve } from '@hono/node-server'
import { Context, Hono } from 'hono'


import  "dotenv/config";

import assert from 'assert';
import { userRouter } from './Users/user.router';
import { bookingRouter } from './booking/booking.router';
import { bookingofferRouter } from './bookingoffer/bookingoffer.router';
import { customerSupportRouter } from './customerSupport/customersupport.router';
import { fleetManagementRouter } from './fleetmanagement/fleetmanagement.router';
import { locationBranchesRouter } from './LocationBranches/locationbranch.router';
import { maintainanceRecordsRouter } from './maintainancerecord/maintainrecord.router';
import { paymentsRouter } from './payment/payment.router';
import { cors } from 'hono/cors';
import { promofferRouter } from './promotionaloffer/promoffer.router';
import { authRouter } from './auth/auth.router';
import { vehicleRouter } from './vehicle/vehicle.router';
import { vehicleSpecsRouter } from './vehicleSpecs/vehiclespecs.router';
import { reviewRouter } from './reviewrating/rating.router';

const app = new Hono();// Enable CORS for all routes
app.use('*', cors({
  origin:'http://localhost:5173', // Replace with your frontend URL
  // origin: 'https://car-client-tau.vercel.app', // Replace with your frontend URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  credentials: true,
}));


// Import your routes here


app.route("/", userRouter)
app.route("/", bookingRouter)
app.route("/", bookingofferRouter)
app.route("/", customerSupportRouter)
app.route("/", fleetManagementRouter)
app.route("/", locationBranchesRouter)
app.route("/", maintainanceRecordsRouter)
app.route("/", paymentsRouter)
app.route("/", promofferRouter)
app.route("/auth", authRouter)
app.route("/",vehicleRouter)
app.route("/",vehicleSpecsRouter)
app.route('/', reviewRouter)






// default path
app.get('/', async (c) => {
  return c.json({ message: 'Hello, Hono!' });
});




app.notFound((c) => {
  return c.text('route not found ', 404);
});



assert(process.env.PORT, "PORT is not set in the .env file")

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT )
})
console.log(`Server is running on port ${process.env.PORT} 📢`)


