import type { Metadata } from 'next';
import { getMe } from '@/lib/api/serverApi';
import ProfileContent from './ProfileContent';

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
  return <ProfileContent user={user}/>;
}

export default ProfilePage;
