import FriendRequest from "../Models/FriendRequest.js";
import User from "../Models/User.js"

export async function getRecommendedUser(req, res) {
try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
        $and: [
            {_id: {$ne: currentUserId}}, //Exclude parameter from the query
            {$id: {$nin: currentUser.friends}},
            {$id: {$nin: currentUser.blocked}},//Also we can discard the native language
            {isOnboarded: true}
        ]
    })

    res.status(200).json(recommendedUsers);

} catch (error) {
    console.error("Error trying to get recommened Users:", error.message);
    res.status(500).json({message: "Internal Error"});
    
}
}
export async function getFriendsUser(req, res){

    try {
        const user = await User.findById(req.user.id).select("friends").populate(
            "fulName", "nativelanguage", "learninglanguage"
        ) //The poluplate function brings all the data asked from de DB in Object

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error trying to get the friends", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function sendFriendRequest(req, res){
    try {
        const myId = req.user.id;
        const {id: recipientId}= req.params;
        // Prevent sending send to yourself
        if(myId === recipientId){
            return res.status(400).json({message: "You cannot send requets to your self"});
        }

        const recipient = await User.findById(recipientId);

        if(!recipient){
            return res.status(404).json({message: "User not found"});
        }

        //Check if user is already friend
        if(recipient.friends.icludes(myId)){
            return res.status(400).json({message: "You are already friends with this user"});
        }

        //Check if a request already exist
        const existingRequest= await FriendRequest.findOne({
            $or: [
                {sender: myId, recipient: recipientId},
                {sender: recipientId, recipient: myId},  
            ],
        });
        if(existingRequest){
            return res.status(400).json({message: "A friend requets already exist netween you and this user"});
        }
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json(friendRequest);

        
    } catch (error) {
        console.error("Error insendRequestFriendconstroller",error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function acceptFriendRequest(req, res){
    try {
        const {id:requestId} = req.params;
        const friendRequest = await FriendRequest.findById(requestId);

        if(!friendRequest){
            return res.status(404).json({message: "Friend request not found"});
        }

        //Verify if current user is the recipient
        if(friendRequest.recipient.toString() !== req.user.id){
            return res.status(403).json({message: "You are not authorized to accept this request"});
        }
        friendRequest.status = "accepted";
        await friendRequest.save();

        //Add each user to their friend list
        //$addToSet: adds elements to an array only if they do not exist
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: {friend: friendRequest.recipient},
        });
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: {friend: friendRequest.sender},
        });

        res.status(200).json({message: "Friend request aceepted"});
    } catch (error) {
        console.log("Error in acceptFriendRequest ", error.message);
    }
}