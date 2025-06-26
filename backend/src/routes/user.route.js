import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"; //backend\src\middleware\auth.middleware.js
import { getFriendsUser, getRecommendedUser ,sendFriendRequest, acceptFriendRequest, getFriendRequests , getOutgoingFriendReq} from "../controllers/user.controller.js";
const router = express.Router();

//MiddleWare for authenticating path in each route of this file.
router.use(protectRoute); 

router.get("/", getRecommendedUser);
router.get("/friends", getFriendsUser);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);
router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReq)

export default router;
