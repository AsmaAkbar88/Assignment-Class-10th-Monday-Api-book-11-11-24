'use client'
import { Book } from "@/data";             //interface ka name hy book wali
import  { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { Label } from "./ui/label";


const BookCard = ({ author, id, imgUrl, title }: Book) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedAuthor, setUpdatedAuthor] = useState(author);
  const router = useRouter();

   // Handle Update Function
   
   const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBook = {
      id,
      title: updatedTitle,
      author: updatedAuthor,
      imgUrl,
    };
    try {
      const response = await fetch(`/api/books`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBook),
      });
      if (response.ok) {
        router.refresh()
        setIsUpdateDialogOpen(false);
      } else {
        console.error("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };
  
  

  // // Handle Delete Function
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/books`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        router.refresh()

        console.log("Book deleted successfully");
      } else {
        console.error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  
  

  
  return (
    <Card className="h-full w-full max-w-sm border-2 border-black">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">  
          <Image src={imgUrl} alt={title} className="object-cover" fill />  
        </div>
      </CardHeader>

      <CardContent className="p-4 border border-red-600">
                        {/* trim krti hy ye      (line-clamp) */}
        <CardTitle className="line-clamp-1 text-red-600">{title}</CardTitle>
        <CardDescription className="hover:text-blue-800">{author}</CardDescription>
      </CardContent>

      <CardFooter className="p-6 flex justify-between">
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full hover:bg-blue-600"  variant="outline">Update</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle >Update Book</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  value={updatedAuthor}
                  onChange={(e) => setUpdatedAuthor(e.target.value)}
                />
              </div>
              <Button className="hover:bg-blue-400 hover:text-black" type="submit">Save Changes</Button>
            </form>

            
          </DialogContent>
        </Dialog>
        <Button className="w-full hover:bg-red-700" variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
