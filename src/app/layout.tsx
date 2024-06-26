import './globals.css';
import Link from "next/link";
import { Metadata } from 'next';
import { Control } from './Control';

export const metadata: Metadata = {
  title: "Next.js practice App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`, { cache: 'no-store' });
  const topics = await resp.json();
  return (
    <html>
      <body className="flex items-center justify-center bg-slate-700">
        <div className="w-3/4 text-center">
          <h1 className="mt-5 py-4 border-2 border-slate-300 rounded-lg font-normal text-5xl text-slate-300"><Link href="/">Practice web</Link></h1>
          <div className='flex justify-center'>
            <ol className='w-1/2 my-4 py-4 border-2 border-slate-300 rounded-lg'>
              {topics.map((topic: any) => {
                return <li key={topic.id} className='font-normal text-indigo-700 text-slate-300 underline'><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
              })
              }
            </ol>
          </div>
          {children}
          <Control/>
        </div>
      </body>
    </html>
  );
}
