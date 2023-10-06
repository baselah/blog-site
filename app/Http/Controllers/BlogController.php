<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        // Apply simple search on the 'name' field
        $blogs = Blog::where('title', 'like', "%$search%")->paginate(10);

        return response()->json(["blogs" => $blogs]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Validate the request data
            $validatedData = $request->validate([
                'title' => 'required|string',
                'content' => 'required|string',
                'date' => 'required|date',
                'status' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Image validation rules
            ]);


            // Handle image upload
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public');
                $validatedData['image'] = '/storage/' . $imagePath; // Store the image path in the database
            }

            // Create a new subscriber record
            $blog = Blog::create($validatedData);

            return response()->json(['message' => 'Blog created successfully', 'blog' => $blog], 201);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string',
                'content' => 'required|string',
                'date' => 'required|date',
                'status' => 'required|string',
                // 'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Image validation rules
            ]);

            // Find the subscriber by ID
            $blog = Blog::find($id);
            // Handle image upload
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public');
                $validatedData['image'] = '/storage/' . $imagePath; // Store the image path in the database
            }
            if (!$blog) {
                return response()->json(['message' => 'blog not found'], 404);
            }

            // Update the subscriber's information
            $blog->update($validatedData);

            return response()->json(['message' => 'blog updated successfully', 'blog' => $blog]);
        } catch (\Throwable $th) {
            return response()->json(["message" => $th->getMessage()],400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $blog = Blog::find($id);
            $blog->delete();

            return response()->json(["message" => "blog deleted succesfully"]);
        } catch (\Throwable $th) {
            return response()->json(["error" => $th->getMessage()]);
        }
    }
}
