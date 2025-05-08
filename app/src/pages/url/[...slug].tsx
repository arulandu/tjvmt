import { Layout } from "@/components/layout";
import { NextPage } from "next";
import { useRouter } from "next/router";

export const getServerSideProps = async (ctx) => {
  const res = await fetch(process.env.PREFIXER_API_URL)
  const data = await res.json()
  const route = ctx.query.slug.join('/')
  const row = data.values.filter(row => row[0] == route)[0]
  
  if(row && !row[1].includes("27qIVQPj6l")){
    return {
      redirect: {
        destination: row[1],
        permanent: true
      }
    }
  }

  return { props: {}}
}

const Post: NextPage<any> = () => {
  const router = useRouter()

  return (
    <Layout>
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-white font-bold text-2xl xl:text-4xl">Oops! Looks like this doesn't exist. Time to yell at an officer <s>or maybe yourself</s>!</h1>
      </div>
    </Layout>
  );
}

export default Post;
