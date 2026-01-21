# Context API Implementation Guide

## 📋 Overview

Your project now includes 5 powerful contexts for state management:

1. **AuthContext** - Authentication state (token, user, role)
2. **FavoritesContext** - User favorites management
3. **BookingContext** - Booking data during checkout process
4. **FilterContext** - Room filters (price, dates, guests)
5. **NotificationContext** - Global notifications/toasts

---

## 🔐 AuthContext

**Purpose**: Manage user authentication state globally

### Usage:

```jsx
import { useAuthContext } from "../context/AuthContext";

const MyComponent = () => {
  const { auth, login, logout } = useAuthContext();

  return (
    <div>
      {auth.isAuthenticated ? (
        <p>
          Welcome {auth.user}! (Role: {auth.role})
        </p>
      ) : (
        <p>Please login</p>
      )}
    </div>
  );
};
```

### Available Methods:

- `auth.token` - User's authentication token
- `auth.user` - User info
- `auth.role` - User role (USER, ADMIN)
- `auth.isAuthenticated` - Boolean flag
- `auth.loading` - Loading state during initialization
- `login(token, user, role)` - Set authentication
- `logout()` - Clear authentication

### Replace in: Navbar.jsx, PrivateRoute.jsx, useAuth.js

---

## ❤️ FavoritesContext

**Purpose**: Manage user's favorite rooms without prop drilling

### Usage:

```jsx
import { useFavorites } from "../context/FavoritesContext";

const RoomCard = ({ roomId }) => {
  const { isFavorite, toggleFavorite, addFavorite, removeFavorite } =
    useFavorites();

  return (
    <div>
      <button onClick={() => toggleFavorite(roomId)}>
        {isFavorite(roomId) ? "❤️ Remove" : "🤍 Add"}
      </button>
    </div>
  );
};
```

### Available Methods:

- `favorites` - Array of favorite room IDs
- `addFavorite(roomId)` - Add to favorites
- `removeFavorite(roomId)` - Remove from favorites
- `toggleFavorite(roomId)` - Toggle favorite status
- `isFavorite(roomId)` - Check if room is favorited
- `clearFavorites()` - Clear all favorites

### Use in: RoomCard.jsx, FavoriteRoom.jsx, Rooms.jsx

---

## 📅 BookingContext

**Purpose**: Share booking details across Booking → Payment → PaymentDetails pages

### Usage:

```jsx
import { useBooking } from "../context/BookingContext";

const Booking = () => {
  const { bookingData, setBooking, clearBooking } = useBooking();

  const handleBooking = (data) => {
    setBooking({
      roomId: data.id,
      roomName: data.name,
      checkInDate: data.checkIn,
      checkOutDate: data.checkOut,
      numberOfGuests: data.guests,
      totalPrice: data.price,
    });
  };

  return (
    <div>
      <p>
        Selected: {bookingData.roomName} - ${bookingData.totalPrice}
      </p>
    </div>
  );
};
```

### Available Methods:

- `bookingData` - Contains all booking info
- `setBooking(data)` - Update booking details
- `updateBookingDetails(details)` - Update specific details
- `clearBooking()` - Reset booking data

### Use in: Booking.jsx, Payment.jsx, PaymentDetails.jsx

---

## 🔍 FilterContext

**Purpose**: Share room filters across Rooms and RoomFilter components

### Usage:

```jsx
import { useFilters } from "../context/FilterContext";

const RoomFilter = () => {
  const { filters, updateFilter, updateMultipleFilters, resetFilters } =
    useFilters();

  return (
    <div>
      <input
        type="number"
        value={filters.priceRange.max}
        onChange={(e) =>
          updateFilter("priceRange", { min: 0, max: e.target.value })
        }
        placeholder="Max Price"
      />
      <button onClick={resetFilters}>Reset Filters</button>
    </div>
  );
};
```

### Available Methods:

- `filters` - Current filter state
- `updateFilter(filterName, value)` - Update single filter
- `updateMultipleFilters(newFilters)` - Update multiple at once
- `resetFilters()` - Reset to defaults

### Filter Properties:

```javascript
{
  priceRange: { min: 0, max: 10000 },
  checkInDate: null,
  checkOutDate: null,
  numberOfGuests: 1,
  roomType: "",
  searchTerm: ""
}
```

### Use in: RoomFilter.jsx, Rooms.jsx

---

## 🔔 NotificationContext

**Purpose**: Global toast/alert messages without props

### Usage:

```jsx
import { useNotification } from "../context/NotificationContext";

const MyComponent = () => {
  const { success, error, warning, info } = useNotification();

  const handleSuccess = () => {
    success("Booking confirmed!"); // Auto-closes in 3 seconds
  };

  const handleError = () => {
    error("Something went wrong!", 5000); // Closes in 5 seconds
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
};
```

### Available Methods:

- `addNotification(message, type, duration)` - Generic method
- `success(message, duration)` - Success notification
- `error(message, duration)` - Error notification
- `warning(message, duration)` - Warning notification
- `info(message, duration)` - Info notification
- `removeNotification(id)` - Remove specific notification
- `clearAllNotifications()` - Clear all notifications
- `notifications` - Array of current notifications

### Notification Types: "success", "error", "warning", "info"

### Create a Toast Component:

```jsx
// src/components/Notifications/NotificationDisplay.jsx
import { useNotification } from "../../context/NotificationContext";
import "./notifications.css";

const NotificationDisplay = () => {
  const { notifications } = useNotification();

  return (
    <div className="notifications-container">
      {notifications.map((notif) => (
        <div key={notif.id} className={`notification ${notif.type}`}>
          {notif.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationDisplay;
```

Add to App.jsx:

```jsx
import NotificationDisplay from "./components/Notifications/NotificationDisplay";

function App() {
  return (
    <>
      <Navbar />
      <NotificationDisplay />
      <Routes>...</Routes>
    </>
  );
}
```

---

## 🔄 Migration Examples

### Example 1: Replace Navbar localStorage checks with AuthContext

**Before:**

```jsx
const [username, setUsername] = useState("");
const [role, setRole] = useState("");

useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const storedRole = localStorage.getItem("role");
  // ... logic
}, []);
```

**After:**

```jsx
import { useAuthContext } from "../../context/AuthContext";

const { auth } = useAuthContext();
// Direct access: auth.user, auth.role, auth.isAuthenticated
```

---

### Example 2: Replace useAuth hook with AuthContext

**Before:**

```jsx
const { login, logout, error, loading } = useAuth();
```

**After:**

```jsx
import { useAuthContext } from "../context/AuthContext";
const { auth, login, logout } = useAuthContext();
```

---

## 🎯 Implementation Checklist

- [ ] ✅ Contexts created in `/src/context/`
- [ ] ✅ index.js updated with all providers
- [ ] [ ] Update Navbar.jsx - Use AuthContext instead of localStorage
- [ ] [ ] Update PrivateRoute.jsx - Use AuthContext
- [ ] [ ] Update RoomCard.jsx - Use FavoritesContext
- [ ] [ ] Update FavoriteRoom.jsx - Use FavoritesContext
- [ ] [ ] Update Booking.jsx - Use BookingContext
- [ ] [ ] Update Payment.jsx - Use BookingContext
- [ ] [ ] Update PaymentDetails.jsx - Use BookingContext
- [ ] [ ] Update RoomFilter.jsx - Use FilterContext
- [ ] [ ] Update Rooms.jsx - Use FilterContext
- [ ] [ ] Create NotificationDisplay component - Use NotificationContext
- [ ] [ ] Add NotificationDisplay to App.jsx
- [ ] [ ] Create notifications.css for styling

---

## 💡 Best Practices

1. **Always check context in components** before using it
2. **Combine contexts** - Use multiple contexts in one component if needed
3. **Keep context state focused** - Don't put everything in one context
4. **Use custom hooks** - Already provided (useAuthContext, useFavorites, etc.)
5. **Error handling** - Contexts throw errors if used outside providers
6. **Performance** - Consider splitting contexts further if you have many subscribers

---

## 📚 Next Steps

1. Start with **AuthContext** - Refactor Navbar and PrivateRoute
2. Add **NotificationContext** display component
3. Integrate **FavoritesContext** into room components
4. Use **BookingContext** for checkout flow
5. Implement **FilterContext** for room filtering
