import type { NextApiRequest, NextApiResponse } from 'next'
import { PythonShell } from 'python-shell'

interface Test {
  params: number[]
  answer: number
}

interface RequestBody {
  userAnswer: string
  unitTests: Test[]
}

type Data = {
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const correctAnswer = 3

  //   const correctAnswers = [3, 0, 0, 1111111110]

  const { userAnswer, unitTests }: RequestBody = req.body

  //   const suffix = `\nprint(solution(${unitTests[0].params[0]}, ${unitTests[0].params[1]}))`

  let suffix = '\nprint(['
  unitTests.forEach((test, index) => {
    suffix += `solution(${test.params[0]}, ${test.params[1]})`
    if (index < unitTests.length - 1) {
      suffix += ', '
    }
  })
  suffix += '])'

  try {
    const messages = await PythonShell.runString(userAnswer + suffix)

    console.log(messages)

    const data = messages && messages[0] === correctAnswer.toString()

    res.status(200).json({ data: data })
  } catch (error) {
    res.status(500).json({ data: 'Error executing Python script' })
  }
}
