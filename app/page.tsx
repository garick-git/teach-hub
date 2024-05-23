import { currentUser } from '@clerk/nextjs/server';
import ClientButton from '../components/ClientButton';

export default async function Home() {
  const user = await currentUser();
  const userId = user?.id;

  return (
    <div>
      <h1 className='font-bold text-center mt-10'>Home page</h1>
      <label>Hello, user: {userId}</label>
      {userId && <ClientButton userId={userId} />}
    </div>
  );
}
