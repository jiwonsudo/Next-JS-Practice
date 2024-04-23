"use client";

import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();
  return (
    <>
    <form onSubmit={(event)=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
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
      <p>
        <input type="text" name="title" placeholder="title"/>
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <p>
        <input type="submit" value="create"></input>
      </p>
    </form>
    </>
  );
}