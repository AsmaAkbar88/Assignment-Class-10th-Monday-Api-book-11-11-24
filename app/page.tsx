import BookCard from "@/components/book-card";
import BookForm from "@/components/book-form";
import { Book } from "@/data";


export default async function Home() {
  
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-screen"
      style={{ backgroundImage: "url('/top-vie.avif')" }} 
    >

     <div className="container mx-auto p-24  ">
       <BookForm /> 
</div>
    </div>
  );
}



   