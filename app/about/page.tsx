'use client'

import Layout from '@/components/layout';
import Box from '@/components/Box';

export default function Home() {

  return (
    <Layout>
      <main className="bg-gray-100 flex min-h-screen flex-col items-center p-24">

        <div className='mb-5'>
          <h1>About Meme World</h1>
        </div>
        <br></br>
        <Box>
          <p>Meme World is a mini project written by Jian Zhou.</p>
          <p>&nbsp;</p>
          <p>This project is part of the study suppervised by AUT software engineering bootcamp programme (taught by Institute of Data experts).</p>
        </Box>
      </main>
    </Layout>
  )
}
