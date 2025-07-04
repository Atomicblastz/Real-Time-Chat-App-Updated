import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skt/MessageSkeleton';
import { formatMessageTime } from '../lib/utils';
import { useAuthStore } from '../store/useAuthStore';
import { useRef } from 'react';

const ChatContainer = () => {
  const { 
    messages, 
    getMessages, 
    isMessagesLoading, 
    selectedUser, 
    subscribeToMessages,
    unsubscribeFromMessages 
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if(selectedUser && selectedUser._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeFromMessages();
    }
  }, [selectedUser, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if(messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if(isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
  )}

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <div className='flex-1 flex flex-col overflow-auto'>
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={
                  message.senderId === authUser._id 
                  ? authUser.profilePicture || "/avatar.png" 
                  : selectedUser.profilePicture || "/avatar.png"
                  } 
                  alt="profile picture" 
                />
              </div>
            </div>
            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className='chat-bubble flex flex-col gap-2'>
              {message.image && (
                <img
                  src={message.image}
                  alt='Attachment'
                  className='sm:max-w-[200px] rounded-md mb-2'
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer