'use client'

export default function Page({ params }) {
  return (
    <div>
      <h3>Blog View</h3>
      <h5>Title: Blog {params.blogList}</h5>
    </div>
  );
}
