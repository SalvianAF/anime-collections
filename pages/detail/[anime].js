import Layout from '../../components/layout';

// export async function getStaticPaths() {
//     const paths = getAllPostIds(); // isinya possible path
//     return {
//         paths,
//         fallback: false,
//     };
// }

// export async function getStaticProps({ params }) {
//     const postData = getPostData(params.id); //buat propsnya
//     return {
//       props: {
//         postData,
//       },
//     };
// }

export default function Anime() {
  return <Layout>...</Layout>;
}