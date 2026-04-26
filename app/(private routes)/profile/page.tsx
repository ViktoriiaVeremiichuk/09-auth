import type { Metadata } from 'next';
import { getMe } from '@/lib/api/serverApi';
import css from '@/app/(private routes)/profile/ProfilePage.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'User profile | NoteHub',
  description: 'Сторінка особистого профілю користувача з налаштуваннями.',
  openGraph: {
    title: 'User profile | NoteHub',
    description: 'User profile page',
  },
};
async function ProfilePage() {
  const user = await getMe();

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

export default ProfilePage;
