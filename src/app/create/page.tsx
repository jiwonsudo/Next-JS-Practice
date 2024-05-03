"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  return (
    <>
    <form onSubmit={(event)=>{
      event.preventDefault();
      const target = event.target as typeof event.target & { title: { value: string }, body: { value: string } };
      const title = target.title.value;
      const body = target.body.value;
      if (!title || !body) {
        alert('빈칸을 채워주세요.');
        return;
      }
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title, body}),
      }
      fetch(`${process.env.NEXT_PUBLIC_API_URL}topics`, option)
      .then(resp => resp.json())
      .then(res => {
        console.log(res);
        const lastId = res.id;
        router.push(`/read/${lastId}`);
        router.refresh();
      });
    }}>
      <p >
        <input className="my-1 pl-1 border-2 border-slate-300 rounded" type="text" name="title" placeholder="title"/>
      </p>
      <p>
        <textarea className="my-1 pl-1 border-2 border-slate-300 rounded" name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input className="inline-block my-1 px-2 py-0.5 rounded text-white bg-cyan-600 hover:underline active:bg-cyan-800" type="submit" value="Submit"></input>
      </p>
      <p>
        <button className="inline-block my-1 px-2 py-0.5 rounded text-white bg-red-600 hover:underline active:bg-red-800" onClick={(event) => {
          event.preventDefault();
          router.push('/');
        }
        }>Cancel</button>
      </p>
    </form>
    </>
  );
}