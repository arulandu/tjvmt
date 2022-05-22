import { Layout } from '@/components/layout';
import Error from 'next/error'

const Custom404 = () => {
    return (
        <Layout>
            <Error statusCode={404} />
        </Layout>
    ); 
}

export default Custom404