export default async function Read(props: any) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}topics/${props.params.id}`, {cache: 'no-store'});
  const topic = await resp.json();
  return (
    <div className="p-5 border-solid border-3 border-black">
      <h2 className="">{ topic.title }</h2>
      { topic.body }
    </div>
  );
}