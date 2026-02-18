import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

// Fetch single post from your API
async function getPost(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    console.log("Failed to fetch data", id);
    notFound();
  }

  return res.json();
}

// SEO metadata
export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  return {
    title: post.title,
    description: post.description,
  };
}

// Page
const BlogPost = async ({ params }) => {
  const { id } = await params;
  const data = await getPost(id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>{data.title}</h1>
          <p className={styles.desc}>{data.description}</p>

          <div className={styles.author}>
            <Image
              src="/illustration.png"
              alt={data.username}
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{data.username}</span>
          </div>
        </div>

        <div className={styles.imageContainer}>
          <Image
            src={data.img}
            alt={data.title}
            fill
            className={styles.image}
            priority
          />
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.text}>{data.content}</p>
      </div>
    </div>
  );
};

export default BlogPost;
