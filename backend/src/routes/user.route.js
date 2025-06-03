import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getFriendsUser, getRecommendedUser ,sendFriendRequest, acceptFriendRequest } from "../controllers/user.controller";
const router = express.Router();

//MiddleWare for authenticating path in each route of this file.
app.use(protectRoute); 

app.get("/", getRecommendedUser);
app.get("/friends", getFriendsUser);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

export default router;
