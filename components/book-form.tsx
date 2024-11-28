"use client";
import React, { useState } from "react";
 import {
Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
 import { Input } from "./ui/input";
 import { Label } from "./ui/label";
 import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const BookForm = () => {
  const [title, setTitle] = useState("");   
  const [author, setAuthor] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();



  // hm ye post ky liye bna rhy hen 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, imgUrl }),
      })

      if (response.ok) {
        setTitle("")
        setAuthor("")
        setImgUrl("")
        router.refresh()
      } else {
        console.error("Failed to create book")
      }
    } catch (error) {
      console.error("Error creating book:", error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto border border-black">
      <CardHeader>
       <CardTitle className="text-3xl">Creat New book</CardTitle>
     </CardHeader>
     <form onSubmit={handleSubmit} className="m-4">      
        <CardContent className="space-y-4">
         <div className="space-y-4">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
               value={title}
             onChange={(e) => {
                 console.log(e);    //e
                 setTitle(e.target.value);
               }}
             />
           </div>
           <div className="space-y-4">
             <Label htmlFor="author">Author</Label>
             <Input
               id="author"
               value={author}
               onChange={(e) => {
                // console.log(e);
                setAuthor(e.target.value);
              }}
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="imgUrl">Image Url</Label>
      <Input
              id="imgUrl"
        value={imgUrl}
               onChange={(e) => {
                // console.log(e);
                setImgUrl(e.target.value);
              }}
            />
          </div>
        </CardContent>

        
        <CardFooter >
           <div className="space-x-8">
           <Button type={"submit"} className="space-x-6">Create book</Button>
           <Button className="hover:bg-red-800" variant={"destructive"} onClick={() => router.push("/books-all")}> See Your Books</Button></div>
         </CardFooter>
       </form>
     </Card>
  );
};

export default BookForm ;
