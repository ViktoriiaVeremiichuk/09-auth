'use client';
import css from '@/app/(auth routes)/sign-in/SignInPage.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from '@/lib/api/clientApi';
import {useAuthStore} from "@/lib/store/authStore";

const SingIn = () => {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    

    try {
        setError(null);
      const userData = await login({ email, password });
      if (userData) {setUser(userData);
        router.push('/profile');
      } else {
        setError("Invalid email or password");
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

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
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SingIn;
