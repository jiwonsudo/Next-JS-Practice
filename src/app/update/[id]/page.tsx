"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Update() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${id}`)
      .then(resp => resp.json())
      .then(res => {
        setTitle(res.title);
        setBody(res.body);
  });
  }, []);
  return (
    <>
      <form onSubmit={(event) => {
        event.preventDefault();
        const target = event.target as typeof event.target & { title: { value: string }, body: { value: string } };
        const title = target.title.value;
        const body = target.body.value;
        if (!title || !body) {
          alert('빈칸을 채워주세요.');
          return;
        }
        const option = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({title, body}),
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/` + id, option)
          .then(resp => resp.json())
          .then(res => {
            console.log(res);
            const lastId = res.id;
            router.push(`/read/${lastId}`);
          });
      }}>
        <p>
          <input className="my-1 pl-1 border-2 border-slate-300 rounded" type="text" name="title" placeholder="title" value={title} onChange={event => setTitle(event.target.value)} />
        </p>
        <p>
          <textarea className="my-1 pl-1 border-2 border-slate-300 rounded" name="body" placeholder="body" value={body} onChange={event => setBody(event.target.value)}></textarea>
        </p>
        <p>
        <input className="inline-block my-1 px-2 py-0.5 rounded text-white bg-cyan-600 hover:underline active:bg-cyan-800" type="submit" value="Submit"></input>
        </p>
      </form>
    </>
  );
}