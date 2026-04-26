'use client';
import css from '@/app/(auth routes)/sign-up/SingUpPage.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const SingUp = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useAuthStore();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    setError(null);

    try {
      const userData = await register({ email, password });
      setUser(userData);
      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign up</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SingUp;
