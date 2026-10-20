import { User, UserRole } from "@/types";
import { getStoredItem, setStoredItem, removeStoredItem } from "@/lib/storage";

const AUTH_STORAGE_KEY = "villaone_auth_user";

const defaultDemoUser: User = {
  id: "cust-1",
  name: "Pooja Singhania",
  email: "pooja.s@example.com",
  phone: "+91 98201 11223",
  role: "customer",
  avatar: "/images/reviews/avatar1.jpg",
};

export const authService = {
  getCurrentUser(): User | null {
    return getStoredItem<User | null>(AUTH_STORAGE_KEY, defaultDemoUser);
  },

  async login(email: string, role: UserRole = "customer"): Promise<User> {
    let name = "Villa Guest";
    let avatar: string | undefined = "/images/reviews/avatar1.jpg";

    if (email.toLowerCase().includes("admin")) {
      role = "admin";
      name = "VillaOne Concierge Director";
      avatar = "/images/reviews/avatar2.jpg";
    } else if (email.toLowerCase().includes("partner") || email.toLowerCase().includes("owner")) {
      role = "partner";
      name = "Conte Alessandro Rossi";
      avatar = "/images/reviews/avatar2.jpg";
    } else if (email.toLowerCase().includes("pooja")) {
      name = "Pooja Singhania";
    } else if (email.toLowerCase().includes("vikram")) {
      name = "Vikramaditya Roy";
      avatar = "/images/reviews/avatar2.jpg";
    } else {
      const prefix = email.split("@")[0];
      name = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }

    const user: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role,
      avatar,
    };

    setStoredItem(AUTH_STORAGE_KEY, user);
    return user;
  },

  async register(
    name: string,
    email: string,
    phone: string,
    role: UserRole = "customer"
  ): Promise<User> {
    const user: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role,
      avatar: "/images/reviews/avatar1.jpg",
    };
    setStoredItem(AUTH_STORAGE_KEY, user);
    return user;
  },

  async logout(): Promise<void> {
    removeStoredItem(AUTH_STORAGE_KEY);
  },
};
