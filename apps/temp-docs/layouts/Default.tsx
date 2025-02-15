import { useEffect, FC } from 'react'
import Head from 'next/head'
import NavBar from '../components/Navigation/NavBar'
import SideBar from '../components/Navigation/SideBar'
import Footer from '../components/Footer'

interface Props {
  meta: { title: string; description?: string; hide_table_of_contents?: boolean }
  children: any
  toc?: any
  menuItems: any
  currentPage: string
}

const Layout: FC<Props> = ({ meta, children, toc, menuItems, currentPage }) => {
  useEffect(() => {
    const key = localStorage.getItem('supabaseDarkMode')
    if (!key) {
      // Default to dark mode if no preference config
      document.documentElement.className = 'dark'
    } else {
      document.documentElement.className = key === 'true' ? 'dark' : ''
    }
  }, [])

  return (
    <>
      <Head>
        <title>{meta?.title} | Supabase</title>
        <meta name="description" content={meta?.description} />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/docs/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={meta?.title} />
        <meta property="og:description" content={meta?.description} />
        <meta property="og:title" content={meta?.title} />
        {/* <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
          as="script"
        /> */}
        {/* <link href={`https://unpkg.com/prismjs@0.0.1/themes/prism-${theme}.css`} rel="stylesheet" /> */}
      </Head>

      <main>
        <NavBar currentPage={currentPage} />
        <div className="flex w-full flex-row">
          <SideBar menuItems={menuItems} />
          <div className="docs-width grid grid-cols-12 gap-4 justify-between p-4 pb-8 w-full">
            <div
              className={`${
                meta?.hide_table_of_contents ? 'col-span-10' : 'col-span-12 xl:col-span-9'
              } py-4 px-8`}
            >
              <article className="prose dark:prose-dark dark:bg-scale-200 width-full mt-8">
                {children}
              </article>
            </div>
            {toc && !meta?.hide_table_of_contents && (
              <div className="border-scale-400 dark:bg-scale-200 thin-scrollbar table-of-contents-height col-span-3 border-l px-4">
                <ul className="toc-menu list-none pl-4 text-[0.8rem] grid gap-1 mt-1">
                  {toc.json.map((item: any, i: number) => {
                    return (
                      <li key={i} className={`${item.lvl === 3 ? 'ml-4' : ''}`}>
                        <a
                          className="text-scale-1000 hover:text-brand-900 transition-colors"
                          href={`#${item.slug}`}
                        >
                          {item.content}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default Layout
