<?php

namespace App\Http\Controllers;

use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        // Apply simple search on the 'name' field
        $subscribers = Subscriber::where('name', 'like', "%$search%")->paginate(10);

        return response()->json(["subscribers" => $subscribers]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string',
            'user_name' => 'required|string|unique:subscribers,user_name', // Ensure username is unique
            'password' => 'required|string',
            'status' => 'required|string',
        ]);

        // Create a new subscriber
        $subscriber = Subscriber::create($validatedData);

        return response()->json(['message' => 'Subscriber created successfully', 'subscriber' => $subscriber], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
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
                'name' => 'required|string',
                'user_name' => 'required|string',
                'status' => 'required|string',
            ]);

            // Find the subscriber by ID
            $subscriber = Subscriber::find($id);

            if (!$subscriber) {
                return response()->json(['message' => 'Subscriber not found'], 404);
            }

            // Update the subscriber's information
            $subscriber->update($validatedData);

            return response()->json(['message' => 'Subscriber updated successfully']);
        } catch (\Throwable $th) {
            return response()->json(["message" => $th->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $subscriber = Subscriber::find($id);
            $subscriber->delete();

            return response()->json(["message" => "subscriber deleted succesfully"]);
        } catch (\Throwable $th) {
            return response()->json(["message" => "Error with deleted subscriber"]);
        }
    }
}
