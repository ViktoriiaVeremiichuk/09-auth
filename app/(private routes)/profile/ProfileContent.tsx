"use client";
import css from '@/app/(private routes)/profile/ProfilePage.module.css';
import Image from 'next/image';
import Link from "next/link";
import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import type { User } from '@/types/user';

interface ProfileContentProps {
  user: User;
}

function Profile({user}:ProfileContentProps) {
    const {setUser, setIsAuthenticated} = useAuthStore();

    useEffect(() => {
    if (user) {
      setUser(user);
      setIsAuthenticated(true);
    }
  }, [user, setUser, setIsAuthenticated]);

  
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || '/default-avatar.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}

export default Profile;