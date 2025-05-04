import React from "react";
import Link from "next/link";
const page = () => {
  const bloglist = [1, 2, 3, 4, 5];
  return (
    <div>
      <h2> blogs page</h2>
      <ul>
        {bloglist.map((id) => (
          <li key={bloglist}>
            <Link href={`/blogs/${id}`}>Blog {id}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
