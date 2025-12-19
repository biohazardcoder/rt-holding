import Head from 'next/head'

export const Title = ({title}: {title: string}) => {
  return (
    <div>
        <Head>
            <title>{title}</title> 
        </Head>
    </div>
  )
}
