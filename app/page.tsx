'use client'

import Layout from '@/components/layout';
import Memes from './memes';

export default function Home() {

  return (
    <Layout>
      <main className="bg-gray-100 flex min-h-screen flex-col items-center px-20 py-10">
        <Memes itemsPerPage={18} />
      </main>
    </Layout>
  )
}
