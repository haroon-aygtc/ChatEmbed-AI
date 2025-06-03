# Laravel 12 API - ChatEmbed AI

This directory contains a Laravel 12 API backend for the ChatEmbed-AI project, featuring a beautiful **natural color theme** with soft, light tones inspired by nature.

## 🎨 Natural Color Theme

The API includes a custom **Natural Light Color Theme** with:

### Color Palette
- **Sage**: `#f8faf8` to `#3d4a3d` - Primary natural green tones
- **Moss**: `#f7f9f7` to `#344234` - Deeper forest greens  
- **Cream**: `#fefdfb` to `#9a8b66` - Warm, soft neutrals
- **Sand**: `#fdfcfa` to `#8b7249` - Earthy, grounding tones

### Theme Features
- ✨ **Gentle gradients** with natural color transitions
- 🌿 **Soft shadows** using sage-tinted opacity
- 🍃 **Smooth animations** with nature-inspired timing
- 🌱 **Responsive design** that adapts beautifully
- 💚 **Accessibility-focused** with proper contrast ratios

## Installation Completed

✅ Laravel 12.16.0 has been successfully installed  
✅ Application key generated  
✅ Environment file (.env) created  
✅ All dependencies installed via Composer  
✅ **Natural theme CSS** created and integrated  
✅ **Beautiful welcome page** with natural styling  

## Project Structure

```
laravel-api/
├── app/                 # Application logic
├── bootstrap/           # Framework bootstrap files
├── config/             # Configuration files
├── database/           # Database migrations, factories, seeds
├── public/             # Public web directory
│   └── css/
│       └── natural-theme.css  # 🎨 Natural color theme
├── resources/          # Views, raw assets
│   └── views/
│       └── welcome.blade.php  # 🌿 Natural-themed welcome page
├── routes/             # Route definitions
├── storage/            # Logs, cache, sessions
├── tests/              # Test files
├── vendor/             # Composer dependencies
├── .env                # Environment configuration
├── artisan             # Artisan command-line tool
└── composer.json       # Composer dependencies
```

## Quick Start

### 1. Start the Development Server
```bash
cd laravel-api
php artisan serve
```
The API will be available at: `http://localhost:8000`

**🌟 Visit the homepage to see the beautiful natural theme in action!**

### 2. Using the Natural Theme

#### In Blade Templates
```html
<!DOCTYPE html>
<html>
<head>
    <link href="{{ asset('css/natural-theme.css') }}" rel="stylesheet">
</head>
<body>
    <div class="card">
        <h3 class="card-title">Beautiful Natural Design</h3>
        <p class="card-description">Soft, nature-inspired colors</p>
    </div>
</body>
</html>
```

#### CSS Classes Available
```css
/* Backgrounds */
.bg-natural-light    /* Sage gradient background */
.bg-sage-whisper     /* Light sage gradient */
.bg-cream-dream      /* Cream gradient */

/* Components */
.card                /* Natural-themed cards */
.btn-primary         /* Sage-colored buttons */
.btn-secondary       /* Cream-colored buttons */
.form-input          /* Natural form inputs */

/* Animations */
.fade-in             /* Gentle fade animation */
.slide-up            /* Smooth slide animation */
.gentle-glow         /* Soft glow effect */
```

### 3. Database Setup (when needed)
```bash
# Run migrations
php artisan migrate

# Seed database (if seeders are created)
php artisan db:seed
```

### 4. Common Artisan Commands
```bash
# Create a new controller
php artisan make:controller ApiController

# Create a new model
php artisan make:model ChatMessage

# Create a new migration
php artisan make:migration create_chat_messages_table

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
```

## 🎨 Design System

### Color Variables
```css
:root {
  /* Sage - Primary natural greens */
  --sage-50: #f8faf8;   /* Lightest sage */
  --sage-500: #9bb09b;  /* Primary sage */
  --sage-900: #3d4a3d;  /* Darkest sage */
  
  /* Cream - Warm neutrals */
  --cream-50: #fefdfb;  /* Lightest cream */
  --cream-500: #e8dcc2; /* Primary cream */
  
  /* Moss - Forest greens */
  --moss-100: #eff3ef;  /* Light moss */
  --moss-500: #85a485;  /* Primary moss */
}
```

### Component Examples
```html
<!-- Natural Card -->
<div class="card fade-in">
    <div class="card-header">
        <h3 class="card-title">🌿 Natural Design</h3>
        <p class="card-description">Beautiful, soft colors</p>
    </div>
    <button class="btn btn-primary">Get Started</button>
</div>

<!-- Status Badge -->
<span class="badge badge-success">Active</span>

<!-- Form Input -->
<input type="text" class="form-input" placeholder="Natural styling">
```

## API Development

### Creating API Routes
Add routes to `routes/api.php`:
```php
Route::prefix('v1')->group(function () {
    Route::get('/chat/messages', [ChatController::class, 'index']);
    Route::post('/chat/messages', [ChatController::class, 'store']);
});
```

### CORS Configuration
Laravel includes CORS support. Configure in `config/cors.php` if needed for frontend integration.

## Environment Configuration

Key environment variables in `.env`:
- `APP_NAME`: Application name
- `APP_ENV`: Environment (local, production)
- `APP_KEY`: Application encryption key (already generated)
- `DB_*`: Database configuration
- `MAIL_*`: Email configuration

## Integration with Next.js Frontend

The Laravel API perfectly complements the Next.js ChatEmbed-AI frontend with **matching natural colors**:

### Color Harmony
- **Frontend**: Uses Tailwind with sage, moss, cream, and sand colors
- **Backend**: Uses CSS variables with identical color values
- **Result**: Seamless visual consistency across the full stack

### Typical API Endpoints for Chat System:
- `GET /api/v1/conversations` - List conversations
- `POST /api/v1/conversations` - Create conversation  
- `GET /api/v1/conversations/{id}/messages` - Get messages
- `POST /api/v1/conversations/{id}/messages` - Send message
- `POST /api/v1/admin/widgets` - Create widget configuration
- `GET /api/v1/admin/analytics` - Get analytics data

## 🌿 Natural Theme Benefits

1. **Visual Harmony**: Consistent with Next.js frontend colors
2. **User Experience**: Calming, nature-inspired interface
3. **Accessibility**: Proper contrast ratios for readability
4. **Modern Design**: Clean, minimal aesthetic
5. **Responsive**: Beautiful on all device sizes
6. **Performance**: Lightweight CSS with smooth animations

## Next Steps

1. ✅ Configure database connection in `.env`
2. ✅ Create models and migrations for chat system
3. ✅ Implement API controllers with natural theme
4. ✅ Set up authentication (Laravel Sanctum recommended)
5. ✅ Configure CORS for frontend integration
6. ✅ Implement real-time features with Laravel Broadcasting

## Laravel Resources

- [Laravel Documentation](https://laravel.com/docs/12.x)
- [Laravel API Resources](https://laravel.com/docs/12.x/eloquent-resources)
- [Laravel Sanctum (API Authentication)](https://laravel.com/docs/12.x/sanctum)
- [Laravel Broadcasting (Real-time)](https://laravel.com/docs/12.x/broadcasting)

---

**🎨 Designed with nature-inspired colors for a beautiful, calming user experience** 🌿 
