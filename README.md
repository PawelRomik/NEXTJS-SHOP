# 🕹️ NEXTJS-SHOP — Gaming Parts E-commerce Platform

<p align="center">
  <img src="https://github.com/user-attachments/assets/6411acdd-325f-4251-a653-4069949aec32" alt="Store Screenshot" width="100%" />
</p>

**NEXTJS-SHOP** (Ephonix) is a modern e-commerce application for gaming components, built with **Next.js** and powered by **Strapi** CMS and **GraphQL**. The platform allows users to browse, search, and filter products, manage their shopping cart, and view their order history. Integration with **Clerk**, **Stripe**, and **Apollo** ensures secure authentication, seamless payments, and efficient data fetching.

---

## ✨ Features

- 🔍 Advanced product filtering and smart search
- 🛒 Add products to cart and place orders
- 🔐 Secure authentication and user account management via **Clerk**
- 💳 Online payment processing with **Stripe**
- 📦 User order history tracking
- ⚡ Fast data handling with **Apollo GraphQL**

---

## 🛠️ Tech Stack

| Frontend                     | Backend & API                | Other Tools               |
|-----------------------------|------------------------------|---------------------------|
| [Next.js](https://nextjs.org)           | [Strapi (Headless CMS)](https://strapi.io)     | [Clerk](https://clerk.com) |
| [React](https://reactjs.org)           | [GraphQL](https://graphql.org)                | [Stripe](https://stripe.com) |
| [Tailwind CSS](https://tailwindcss.com) | [Apollo Client](https://www.apollographql.com/docs/react/) | [Axios](https://axios-http.com) |
| [Framer Motion](https://www.framer.com/motion/) |                              | [Remix Icon](https://remixicon.com) |
| [Radix UI](https://www.radix-ui.com)   |                              | [React-Redux](https://react-redux.js.org) |

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/9dd485a6-291e-4c45-ae60-5b5b36483383)
![image](https://github.com/user-attachments/assets/cf9a34f9-2893-4c24-9eee-f99171693cd3)
![image](https://github.com/user-attachments/assets/b653db45-78c4-40df-b307-8705b2a7a957)
![image](https://github.com/user-attachments/assets/1698c969-90d9-4b81-8009-213dcdd6ba6e)


---

## 📦 Installation

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/nextjs-shop.git
cd nextjs-shop
```
### 2. Start the Strapi Backend
```bash
cd strapi
npm install
npm run develop
```
Copy `.env.example` and rename it to `.env`, then fill in your own API keys:
```
SHOP_URL=shop_url (default: http://localhost:3000)
STRIPE_SECRET_KEY=stripe_secret_key
```
### 3. Start the Next.js Frontend
```bash
cd shop
npm install
npm run dev
```
Copy `.env.example` and rename it to `.env.local`, then fill in your own API keys:
```
NEXT_PUBLIC_STRAPI_AUTH_KEY=your_strapi_api_token
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=stripe_publishable_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=clerk_publishable_key
CLERK_SECRET_KEY=clerk_secret_key
RESEND_API_KEY=resend_api_key
SUPPORT_EMAIL_TO=email
```
