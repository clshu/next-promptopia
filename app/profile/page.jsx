'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const ProfileFC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  console.log(session);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log(session?.user.id);
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (session) {
      fetchPosts();
      console.log(posts);
    }
  }, []);

  const handleEdit = async () => {
    console.log('handleEdit');
  };

  const handleDelete = async () => {
    console.log('handleDelete');
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={[]}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfileFC;
