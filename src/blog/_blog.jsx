import Head from 'next/head'
import { PortableText } from '@portabletext/react'

import { client } from '../../sanity/client'
import { urlFor } from '../../sanity/image'
import { Container } from '@/components/Container'

export default function PostPage({ post }) {
  if (!post) return null

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt || ''} />
      </Head>

      <Container className="mt-16 sm:mt-24">
        <article className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
            {post.title}
          </h1>

          {post.publishedAt ? (
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
              {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
            </p>
          ) : null}

          {post.coverImage ? (
            <img
              src={urlFor(post.coverImage).width(1200).height(700).fit('crop').url()}
              alt=""
              className="mt-8 w-full rounded-2xl object-cover"
            />
          ) : null}

          <div className="prose prose-zinc mt-10 dark:prose-invert">
            <PortableText value={post.content} />
          </div>
        </article>
      </Container>
    </>
  )
}

export async function getStaticPaths() {
  const slugs = await client.fetch(`*[_type=="post" && defined(slug.current)][].slug.current`)
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const post = await client.fetch(
    `*[_type=="post" && slug.current == $slug][0]{
      title, excerpt, publishedAt, coverImage, content
    }`,
    { slug: params.slug }
  )

  return {
    props: { post: post || null },
    revalidate: 1,
  }
}
