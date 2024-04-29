"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  
  return (
    <ul>
      <li><Link href="/create" className="inline-block my-1 px-2 py-0.5 border-2 border-black rounded">Create</Link></li>
      { id ? <>
        <li><Link href={"/update/" + id} className="inline-block my-1 px-2 py-0.5 border-2 border-black rounded">Update</Link></li>
        <li><button onClick={() => {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`, { method: 'DELETE' });
          router.push('/');
          router.refresh();
        }}>delete</button></li>

      </> : null }
    </ul>
  );
}
