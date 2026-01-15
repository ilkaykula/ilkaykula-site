import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { getIconFromLabel } from '@/lib/iconMapper'

import image1 from '@/images/photos/image-1.jpeg'
import image2 from '@/images/photos/image-2.jpeg'
import image3 from '@/images/photos/image-3.jpeg'
import image4 from '@/images/photos/image-4.jpeg'
import image5 from '@/images/photos/image-5.jpeg'

import { client } from '../sanity/client'

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link {...props}>
      <a className="group -m-1 p-1">
        <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      </a>
    </Link>
  )
}

function Resume({ items = [] }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>

      <ol className="mt-6 space-y-4">
        {(items || []).map((role) => (
          <li key={role._id} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800" />

            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>

              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.role}
              </dd>

              <dt className="sr-only">Date</dt>
              <dd className="ml-auto text-xs text-zinc-400 dark:text-zinc-500">
                <time>{role.start}</time> <span aria-hidden="true">—</span>{' '}
                <time>{role.end}</time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Photos() {
  let rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5].map((image, imageIndex) => (
          <div
            key={image.src}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              rotations[imageIndex % rotations.length]
            )}
          >
            <Image
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const DEFAULT_TITLE = 'Web Developer | E-Commerce & Social Media Manager'
const DEFAULT_DESCRIPTION = "Web geliştirme, e-ticaret ve sosyal medya yönetimi alanlarında markalara dijital çözümler üreten kişisel site."

export default function Home({ home, workItems = [], error }) {
  // Show error state if data fetch failed
  if (error) {
    console.error('Failed to load content:', error)
  }

  return (
    <>
      <Head>
        <title>{home?.seoTitle || DEFAULT_TITLE}</title>
        <meta
          name="description"
          content={home?.seoDescription || DEFAULT_DESCRIPTION}
        />
      </Head>

      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {home?.heroTitle || DEFAULT_TITLE}
          </h1>

          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {home?.bio || DEFAULT_DESCRIPTION}
          </p>

          <div className="mt-6 flex gap-6">
            {(home?.socialLinks || []).map((s, i) => (
              <SocialLink
                key={i}
                href={s.url}
                aria-label={s.label}
                icon={getIconFromLabel(s.label)}
              />
            ))}
          </div>
        </div>
      </Container>

      <Photos />

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume items={workItems} />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  try {
    const home = await client.fetch(`*[_type=="home"][0]{
      seoTitle,
      seoDescription,
      heroTitle,
      bio,
      socialLinks
    }`)

    const workItems = await client.fetch(`*[_type=="workItem"]|order(order asc, _createdAt desc){
      _id,
      company,
      role,
      start,
      end,
      link
    }`)

    return {
      props: {
        home: home || null,
        workItems: workItems || [],
        error: null,
      },
      // NOTE: revalidate is USELESS in static export mode
      // If you need dynamic updates, use server-side rendering
    }
  } catch (error) {
    console.error('Error fetching Sanity data:', error)
    return {
      props: {
        home: null,
        workItems: [],
        error: error.message || 'Failed to fetch content',
      },
    }
  }
}

