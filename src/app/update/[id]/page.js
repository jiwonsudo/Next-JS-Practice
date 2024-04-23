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
        const title = event.target.title.value;
        const body = event.target.body.value;
        const option = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, body }),
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
          <input type="text" name="title" placeholder="title" value={title} onChange={event => setTitle(event.target.value)} />
        </p>
        <p>
          <textarea name="body" placeholder="body" value={body} onChange={event => setBody(event.target.value)}></textarea>
        </p>
        <p>
          <input type="submit" value="update"></input>
        </p>
      </form>
    </>
  );
}