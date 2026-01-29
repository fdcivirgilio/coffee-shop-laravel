<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::latest()->get();
        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function toggleAdmin(User $user)
    {
        // Prevent self-demotion if needed, or critical admins.
        // For now, allow simple toggle.
        
        $user->update([
            'is_admin' => !$user->is_admin,
        ]);

        return redirect()->back()->with('success', 'User admin status updated.');
    }
}
