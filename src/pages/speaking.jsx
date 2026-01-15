import Head from 'next/head'
import Link from 'next/link'

import { SimpleLayout } from '@/components/SimpleLayout'
import { Card } from '@/components/Card'

import { client } from '../sanity/client'
import { urlFor } from '../sanity/image'

export default function Blog({ posts = [], error }) {
  if (error) {
    console.error('Failed to load posts:', error)
  }

  return (
    <>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Yazılarım ve notlarım." />
      </Head>

      <SimpleLayout
        title="Blog"
        intro="Yazılar, notlar ve öğrendiklerim."
      >
        <div className="space-y-6">
          {(posts || []).map((post) => (
            <Card key={post._id} className="p-0">
              <Link href={`/blog/${post.slug}`}>
                <a className="group flex flex-col gap-5 rounded-2xl p-6 sm:flex-row">
                  <div className="w-full sm:w-52">
                    {post.coverImage ? (
                      <img
                        src={urlFor(post.coverImage).width(600).height(400).fit('crop').url()}
                        alt=""
                        className="h-40 w-full rounded-xl object-cover sm:h-32"
                      />
                    ) : (
                      <div className="h-40 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:h-32" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-zinc-800 group-hover:text-teal-500 dark:text-zinc-100">
                      {post.title}
                    </h2>

                    {post.publishedAt ? (
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                      </p>
                    ) : null}

                    {post.excerpt ? (
                      <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                        {post.excerpt}
                      </p>
                    ) : null}

                    <p className="mt-4 text-sm font-medium text-teal-600 dark:text-teal-400">
                      Devamını oku →
                    </p>
                  </div>
                </a>
              </Link>
            </Card>
          ))}
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  try {
    const posts = await client.fetch(`*[_type=="post"]|order(publishedAt desc, _createdAt desc){
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      coverImage
    }`)

    return {
      props: { 
        posts: posts || [],
        error: null,
      },
      // NOTE: revalidate is USELESS in static export mode
    }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return {
      props: {
        posts: [],
        error: error.message || 'Failed to fetch content',
      },
    }
  }
}
