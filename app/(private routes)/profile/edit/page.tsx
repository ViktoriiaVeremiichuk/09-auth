'use client';
import css from '@/app/(private routes)/profile/edit/EditProfilePage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { api } from '@/lib/api/clientApi';

function EditProfile() {
  const router = useRouter();

  const { user, setUser } = useAuthStore();

  const [username, setUsername] = useState(user?.username || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data } = await api.patch('/users/me', { username });
      setUser(data);
      router.push('/profile');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || '/default-avatar.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button              
              disabled={isLoading}
              type="submit"
              className={css.saveButton}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className={css.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default EditProfile;
