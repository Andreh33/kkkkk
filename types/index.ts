import type { AppointmentStatus, BlogStatus, OrderStatus, Role, ServiceCategory } from "@prisma/client";

export type { AppointmentStatus, BlogStatus, OrderStatus, Role, ServiceCategory };

export interface CartItem {
  id: string;
  type: "product" | "service";
  name: string;
  price: number;
  quantity: number;
  image?: string;
  serviceId?: string;
  productId?: string;
  variant?: string;
  slug: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

export interface AvailableSlot {
  time: string;
  startsAt: Date;
  endsAt: Date;
}
