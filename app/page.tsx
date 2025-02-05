'use client'

import axios from 'axios'
import { useState } from 'react'

export default function Home() {
  const [res, setRes] = useState<any>()

  const getData = async () => {
      const {data} = await axios.get('/api/advokatregisteret')
      setRes(data)
  }

  return (
    <div>
      <button onClick={() => getData()}>Hent data fra advokatregisteret</button>
      <pre>
        {JSON.stringify(res, null, 4)}
      </pre>
    </div>
  )
}
