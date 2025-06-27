import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import { StreamChat } from "stream-chat";
import { LoaderIcon, MessageSquareIcon } from "lucide-react";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const FriendsPage = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  const [friendsWithLastMsg, setFriendsWithLastMsg] = useState([]);

  useEffect(() => {
    const fetchLastMessages = async () => {
      if (!authUser || !friends.length) return;
      const client = StreamChat.getInstance(STREAM_API_KEY);
      // Aquí deberías conectar el usuario si no está conectado
      await client.connectUser(
        {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        },
        localStorage.getItem("stream_token") // O tu método para obtener el token
      );
      const friendData = await Promise.all(
        friends.map(async (friend) => {
          const channelId = [authUser._id, friend._id].sort().join("-");
          const channel = client.channel("messaging", channelId, {
            members: [authUser._id, friend._id],
          });
          await channel.watch();
          const lastMsg =
            channel.state.messages[channel.state.messages.length - 1];
          return {
            ...friend,
            lastMessage: lastMsg ? lastMsg.text : null,
            lastMessageAt: lastMsg ? lastMsg.created_at : null,
          };
        })
      );
      // Ordenar por fecha de último mensaje (más reciente primero)
      friendData.sort(
        (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
      );
      setFriendsWithLastMsg(friendData);
    };
    fetchLastMessages();
    // eslint-disable-next-line
  }, [authUser, friends]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Conversations</h2>
      {friendsWithLastMsg.length === 0 ? (
        <div className="text-center opacity-70">No conversations yet.</div>
      ) : (
        <ul className="space-y-3">
          {friendsWithLastMsg.map((friend) => (
            <li
              key={friend._id}
              className="flex items-center gap-4 p-4 bg-base-200 rounded-lg shadow hover:bg-base-300 cursor-pointer transition"
              onClick={() => navigate(`/chat/${friend._id}`)}
            >
              <img
                src={friend.profilePic}
                alt={friend.fullName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-semibold">{friend.fullName}</div>
                <div className="text-xs opacity-70 flex items-center gap-1">
                  <MessageSquareIcon className="size-3 mr-1" />
                  {friend.lastMessage ? friend.lastMessage : "No messages yet"}
                </div>
              </div>
              {friend.lastMessageAt && (
                <div className="text-xs opacity-50 whitespace-nowrap">
                  {new Date(friend.lastMessageAt).toLocaleString()}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FriendsPage;
