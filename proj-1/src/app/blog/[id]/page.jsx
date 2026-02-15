import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

// Fetch single post
async function getPost(id) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound(); //  correct usage
  }

  return res.json();
}

// SEO metadata
export async function generateMetadata({ params }) {
  const { id } = await params; //  await params
  const post = await getPost(id);

  return {
    title: post.title,
    description: post.body,
  };
}

// Page
const BlogPost = async ({ params }) => {
  const { id } = await params; //  await params
  const data = await getPost(id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>{data.body}</p>

          <div className={styles.author}>
            <Image
              src="/illustration.png" // fallback image
              alt="Author"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>
              User {data.userId}
            </span>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src="/illustration.png" // fallback post image
            alt={data.title}
            fill
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.text}>{data.body}</p>
      </div>
    </div>
  );
};

export default BlogPost;
