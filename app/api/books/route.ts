import { books } from "@/data";
import { NextRequest } from "next/server";

export const GET = async (request:NextRequest) => {
  const data = JSON.stringify(books);
  console.log (data)
  return new Response(data, { status: 200 });
};



export const POST = async (request:NextRequest): Promise<Response> => {
  try {
    const newBook = await request.json();
    const maxId = books.length ? Math.max(...books.map((book) => book.id)) : 0;
    newBook.id = maxId + 1;
    books.push(newBook)
    return new Response(JSON.stringify({ newBook: newBook }), {
      status: 200,
    });
  } catch {
    return new Response(JSON.stringify({ message: "INvalide data" }), {
      status: 400,
    });
  }
};


export async function PUT(request: Request) {
  try {
    // Parse the JSON body of the request to get the book ID and the updated details
    const { id, ...updatedBook } = await request.json();

    // Find the index of the book to update in the books array
    const bookIndex = books.findIndex((b) => b.id === id);

    if (bookIndex !== -1) {
      // If the book exists, update its details
      books[bookIndex] = { ...books[bookIndex], ...updatedBook };

      // Respond with a success message and the updated book
      return new Response(
        JSON.stringify({ message: "Book updated!", book: books[bookIndex] }),
        { status: 200 } // Status 200 indicates a successful operation
      );
    } else {
      // If the book is not found, return a 404 response
      return new Response(JSON.stringify({ message: "Book not found!" }), {
        status: 404,
      });
    }
  } catch {
    // Catch and handle errors related to invalid JSON input
    return new Response(JSON.stringify({ message: "Invalid JSON input" }), {
      status: 400, // Status 400 indicates a bad request
    });
  }
}

// Handler for DELETE requests
export async function DELETE(request: Request) {
  const { id }: { id: number } = await request.json();

  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex !== -1) {
    const deletedBook = books.splice(bookIndex, 1); // Splice removes the book and returns it

    return new Response(
      JSON.stringify({ message: "Book deleted!", book: deletedBook[0] }),
      { status: 200 } // Status 200 indicates a successful operation
    );
  } else {
    return new Response(JSON.stringify({ message: "Book not found!" }), {
      status: 404,
    });
  }
}
