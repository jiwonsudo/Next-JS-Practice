"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  
  return (
    <ul>
      <li><Link href="/create" className="inline-block my-1 px-2 py-0.5 border-2 border-white rounded text-white active:text-slate-300 active:border-slate-300 hover:underline">Create</Link></li>
      { id ?
        <>
        <li><Link href={"/update/" + id} className="inline-block my-1 px-2 py-0.5 border-2 border-white rounded text-white active:text-slate-300 active:border-slate-300 hover:underline">Update</Link></li>
        <li><button className="inline-block my-1 px-2 py-0.5 rounded text-white bg-red-600 hover:underline active:bg-red-800" onClick={() => {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, { method: 'DELETE' });
          router.push('/');
          router.refresh();
        }}>delete</button></li>

      </> : null }
    </ul>
  );
}
