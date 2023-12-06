export default function Home() {
  const onClick = async () => {
    fetch('/api/py', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAnswer: 'def solution(a, b):\n  return a + b',
        unitTests: [
          {
            params: [1, 2],
            answer: 3,
          },
          {
            params: [0, 0],
            answer: 0,
          },
          {
            params: [1, -1],
            answer: 0,
          },
          {
            params: [123456789, 987654321],
            answer: 1111111110,
          },
        ],
      }),
    })
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
