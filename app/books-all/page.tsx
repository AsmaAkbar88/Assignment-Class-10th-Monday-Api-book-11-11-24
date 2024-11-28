import BookCard from '@/components/book-card';
import { Book } from '@/data';
import Link from 'next/link';
import React from 'react'

export default async function  page() {
  
    const res = await fetch("http://localhost:3000/api/books");
    const books: Book[] = await res.json();     //data.ts wali file ka verible hy
   console.log(books);
  return (
    
<div className='p-12 bg-gray-400'>
<button className='bg-black rounded-full px-5 py-2 hover:bg-blue-400 text-white'>
<Link href={'/'}>Back to Home</Link></button>
    <div className="grid grid-cols-1 gap-6 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

   {books.map((book) => (
     <BookCard
       key={book.id}
       author={book.author}
       imgUrl={book.imgUrl}
       title={book.title}
       id={book.id}

     />
   ))}
 </div>
 
 </div>
  )
}




