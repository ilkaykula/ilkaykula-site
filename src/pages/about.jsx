import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { getIconFromLabel } from '@/lib/iconMapper'

import { PortableText } from '@portabletext/react'
import { client } from '../sanity/client'
import { urlFor } from '../sanity/image'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link href={href}>
        <a className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500">
          <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
          <span className="ml-4">{children}</span>
        </a>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About({ about, error }) {
  if (error) {
    console.error('Failed to load about page:', error)
  }

  return (
    <>
      <Head>
        <title>{about?.seoTitle || 'About'}</title>
        <meta name="description" content={about?.seoDescription || ''} />
      </Head>

      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              {about?.profileImage ? (
                <img
                  src={urlFor(about.profileImage).width(800).height(800).fit('crop').url()}
                  alt=""
                  className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                />
              ) : null}
            </div>
          </div>

          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {about?.title || ''}
            </h1>

            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              {about?.content ? (
                <PortableText value={about.content} />
              ) : null}
            </div>
          </div>

          <div className="lg:pl-20">
            <ul role="list">
              {(about?.socialLinks || []).map((s, i) => (
                <SocialLink 
                  key={i} 
                  href={s.url} 
                  icon={getIconFromLabel(s.label)} 
                  className={i === 0 ? 'mt-4' : 'mt-4'}
                >
                  {s.label || 'Social'}
                </SocialLink>
              ))}

              {about?.email ? (
                <SocialLink
                  href={`mailto:${about.email}`}
                  icon={MailIcon}
                  className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                >
                  {about.email}
                </SocialLink>
              ) : null}
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  try {
    const about = await client.fetch(`*[_type=="about"][0]{
      seoTitle,
      seoDescription,
      title,
      content,
      profileImage,
      socialLinks,
      email
    }`)

    return {
      props: { 
        about: about || null,
        error: null,
      },
      // NOTE: revalidate is USELESS in static export mode
    }
  } catch (error) {
    console.error('Error fetching about page:', error)
    return {
      props: {
        about: null,
        error: error.message || 'Failed to fetch content',
      },
    }
  }
}

