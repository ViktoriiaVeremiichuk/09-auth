


import ProfileContent from './ProfileContent';

export const metadata = {
  title: 'User profile | NoteHub',
  description: 'Сторінка особистого профілю користувача з налаштуваннями.',
  openGraph: {
    title: 'User profile | NoteHub',
    description: 'User profile page',
  },
};
function ProfilePage() {
    
  return <ProfileContent />;
};

export default ProfilePage;


