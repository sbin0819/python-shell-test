export default function Home() {
  const onClick = async () => {
    fetch('/api/py')
      .then((res) => res.json())
      .then((data) => console.log(data))
  }
  return (
    <main>
      <h1>Python</h1>
      <button onClick={onClick}>Button</button>
    </main>
  )
}
